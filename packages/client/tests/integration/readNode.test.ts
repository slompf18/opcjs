/**
 * Integration tests – read a node from the OPC UA ConsoleReferenceServer.
 *
 * The server is started automatically by the global setup (globalSetup.ts)
 * before Vitest executes any test in this suite.
 */

import { describe, expect, it } from 'vitest';
import { Client } from '../../src/client.js';
import { ConfigurationClient } from '../../src/configurationClient.js';
import { Id } from '../../src/id.js';
import { UserIdentity } from '../../src/userIdentity.js';
import { Console } from 'console';

describe('readNode', () => {
    it('readNode', async () => {
        const endpointUrl = 'wss://add8470387ec:62542/Test/ReferenceServer/';
        const configuration = ConfigurationClient.getSimple('MyNodeOPCUAClient', 'eos');
        const client = new Client(endpointUrl, configuration, UserIdentity.newAnonymous());

        await client.connect();
        console.log('Connected successfully!');

        const results = await client.read([Id.newId(2, 'Scalar_Simulation_Double')])

        // Check that we got one result
        expect(results).toHaveLength(1);
        // Check that the result is a Variant
        expect(results[0]).toHaveProperty('value');
        // Check that the StatusCode is good (0 = Good)
        expect(results[0].status).toBeDefined();
        expect(results[0].status).toBe("0");
    });

    it('subscribe', async () => {
        // const endpointUrl = 'wss://add8470387ec:62542/Test/ReferenceServer/';
        // const configuration = ConfigurationClient.getSimple('MyNodeOPCUAClient', 'eos');
        // const client = new Client(endpointUrl, configuration, UserIdentity.newAnonymous());

        // await client.connect();
        // console.log('Connected successfully!');

        // const receivedData = await new Promise((resolve) => {
        //     client.subscribe([Id.newId(2, 'Scalar_Simulation_Double')], (datas) => {
        //         resolve(datas)
        //     })
        // });

        // console.log('Received data:', receivedData);
    });
});
