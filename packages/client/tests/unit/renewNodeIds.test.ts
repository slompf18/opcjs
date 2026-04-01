/**
 * Unit tests for the Session Client Renew NodeIds conformance unit.
 *
 * OPC UA Part 4, Section 5.7.1: after every session (re-)establishment the client
 * reads Server.NamespaceArray (ns=0, i=2255) and fires `onNamespaceTableChanged`
 * when the table has changed so the application can remap cached NodeIds.
 *
 * Tests drive `refreshNamespaceTable()` directly via `(client as any)` to keep
 * things fast without spinning up a real transport.
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { Client } from '../../src/client.js'
import { ConfigurationClient } from '../../src/configuration/configurationClient.js'
import { NamespaceTable } from '../../src/namespaceTable.js'
import { UserIdentity } from '../../src/userIdentity.js'

const BASE_NS = 'http://opcfoundation.org/UA/'
const MY_NS = 'urn:my-server:model'
const OTHER_NS = 'urn:unrelated'

/**
 * Wraps a string[] in the Variant-like shape that AttributeService.ReadValue
 * actually returns (DataValue.value === Variant, Variant.value === the inner array).
 */
function makeVariantResult(uris: string[]) {
    return [{ value: { value: uris } }]
}

function makeClient(): Client {
    const config = ConfigurationClient.getSimple('renew-nodeids-test', 'test')
    const identity = UserIdentity.newAnonymous()
    return new Client('opc.wss://localhost:4840', config, identity)
}

function injectAttributeService(client: Client, readValue: ReturnType<typeof vi.fn>): void {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(client as any).attributeService = { ReadValue: readValue }
}

describe('Client.refreshNamespaceTable', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('stores the NamespaceTable after the first read', async () => {
        const uris = [BASE_NS, MY_NS]
        const readValue = vi.fn().mockResolvedValue(makeVariantResult(uris))
        const client = makeClient()
        injectAttributeService(client, readValue)

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (client as any).refreshNamespaceTable()

        const table = client.getNamespaceTable()
        expect(table).toBeInstanceOf(NamespaceTable)
        expect(table?.getUris()).toEqual(uris)
    })

    it('does not fire onNamespaceTableChanged after the first read (no old table)', async () => {
        const readValue = vi.fn().mockResolvedValue(makeVariantResult([BASE_NS, MY_NS]))
        const client = makeClient()
        injectAttributeService(client, readValue)
        const changed = vi.fn()
        client.onNamespaceTableChanged = changed

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (client as any).refreshNamespaceTable()

        expect(changed).not.toHaveBeenCalled()
    })

    it('does not fire onNamespaceTableChanged when the table is unchanged', async () => {
        const uris = [BASE_NS, MY_NS]
        const readValue = vi.fn().mockResolvedValue(makeVariantResult(uris))
        const client = makeClient()
        injectAttributeService(client, readValue)
        const changed = vi.fn()
        client.onNamespaceTableChanged = changed

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const refresh = () => (client as any).refreshNamespaceTable()
        await refresh()
        await refresh()

        expect(changed).not.toHaveBeenCalled()
    })

    it('fires onNamespaceTableChanged with old and new tables when the table changes', async () => {
        const firstUris = [BASE_NS, MY_NS]
        const secondUris = [BASE_NS, OTHER_NS, MY_NS]
        const readValue = vi.fn()
            .mockResolvedValueOnce(makeVariantResult(firstUris))
            .mockResolvedValueOnce(makeVariantResult(secondUris))
        const client = makeClient()
        injectAttributeService(client, readValue)
        const changed = vi.fn()
        client.onNamespaceTableChanged = changed

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const refresh = () => (client as any).refreshNamespaceTable()
        await refresh()
        await refresh()

        expect(changed).toHaveBeenCalledOnce()
        const [oldTable, newTable] = changed.mock.calls[0] as [NamespaceTable, NamespaceTable]
        expect(oldTable.getUris()).toEqual(firstUris)
        expect(newTable.getUris()).toEqual(secondUris)
    })

    it('does nothing when attributeService is not yet initialised', async () => {
        const client = makeClient()
        // attributeService is undefined before connect()
        await expect(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (client as any).refreshNamespaceTable(),
        ).resolves.toBeUndefined()
        expect(client.getNamespaceTable()).toBeUndefined()
    })

    it('warns but does not throw when the ReadValue call rejects', async () => {
        const readValue = vi.fn().mockRejectedValue(new Error('network error'))
        const client = makeClient()
        injectAttributeService(client, readValue)

        await expect(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (client as any).refreshNamespaceTable(),
        ).resolves.toBeUndefined()
    })

    it('warns but does not throw when the read result is not an array', async () => {
        // value.value is a string, not an array — simulates an unexpected server response.
        const readValue = vi.fn().mockResolvedValue([{ value: { value: 'not-an-array' } }])
        const client = makeClient()
        injectAttributeService(client, readValue)

        await expect(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (client as any).refreshNamespaceTable(),
        ).resolves.toBeUndefined()
        expect(client.getNamespaceTable()).toBeUndefined()
    })

    it('reads NamespaceArray from initServices (via fire-and-forget)', async () => {
        const uris = [BASE_NS, MY_NS]
        const readValue = vi.fn().mockResolvedValue(makeVariantResult(uris))
        const client = makeClient()

        // Simulate what connect() does: set up session + services, then call initServices()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const c = client as any
        c.session = {
            getAuthToken: () => ({ identifier: 0, namespace: 0 }),
        }
        c.secureChannel = {}
        c.attributeService = { ReadValue: readValue }
        c.methodService = {}
        c.browseService = {}
        c.subscriptionHandler = {
            onShutdown: undefined,
            hasActiveSubscription: () => false,
        }

        // Replace initServices to only trigger refreshNamespaceTable
        const originalRefresh = c.refreshNamespaceTable.bind(c)
        vi.spyOn(c, 'refreshNamespaceTable').mockImplementation(originalRefresh)

        await c.refreshNamespaceTable()

        const table = client.getNamespaceTable()
        expect(table?.getIndex(MY_NS)).toBe(1)
    })
})
