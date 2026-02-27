/**
 * Vitest global setup for integration tests.
 *
 * Starts the OPC UA ConsoleReferenceServer before any test runs and shuts it
 * down once all tests have completed.  No test is allowed to proceed until the
 * server prints "Server started." to its standard output.
 *
 * Set the environment variable OPCUA_EXTERNAL_SERVER=1 to skip the automatic
 * server lifecycle management.  This is useful when you want to start and
 * debug the server yourself before running the tests, e.g.:
 *
 *   OPCUA_EXTERNAL_SERVER=1 npm test
 */

import { spawn, type ChildProcess } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

let serverProcess: ChildProcess | null = null;

function prefixLines(text: string, prefix: string): string {
    return text
        .split('\n')
        .map((line, i, arr) =>
            // Skip the empty string produced by a trailing newline.
            i === arr.length - 1 && line === '' ? '' : `${prefix}${line}`
        )
        .join('\n');
}

export async function setup(): Promise<void> {
    if (process.env.OPCUA_EXTERNAL_SERVER === '1') {
        console.warn('[globalSetup] OPCUA_EXTERNAL_SERVER=1 – skipping server start. Tests requiring a server will fail if none is running.');
        return;
    }

    const serverDir = path.resolve(__dirname, 'bin/uaNetRefServer');

    // Kill any leftover server process from a previous (interrupted) run.
    await new Promise<void>((resolve) => {
        const killer = spawn('pkill', ['-9', '-f', 'RefServer.dll'], { stdio: 'ignore' });
        killer.on('exit', () => resolve());
        killer.on('error', () => resolve()); // pkill not available on all platforms
    });
    // Give the OS a moment to release the port.
    await new Promise<void>((resolve) => setTimeout(resolve, 500));

    await new Promise<void>((resolve, reject) => {
        let started = false;

        serverProcess = spawn('dotnet', ['RefServer.dll'], {
            cwd: serverDir,
            stdio: ['ignore', 'pipe', 'pipe'],
        });

        const startupTimeout = setTimeout(() => {
            if (!started) {
                reject(new Error('Timed out waiting 30 s for "Server started." from RefServer'));
            }
        }, 30_000);

        serverProcess.stdout!.on('data', (chunk: Buffer) => {
            const text = chunk.toString();
            // Forward all server stdout, prefixed so it is easy to identify.
            //process.stdout.write(prefixLines(text, '[RefServer] '));
            if (!started && text.includes('Server started.')) {
                started = true;
                clearTimeout(startupTimeout);
                resolve();
            }
        });

        serverProcess.stderr!.on('data', (chunk: Buffer) => {
            // Forward server stderr prefixed so it is easy to identify.
            //process.stderr.write(prefixLines(chunk.toString(), '[RefServer] '));
        });

        serverProcess.on('error', (err) => {
            clearTimeout(startupTimeout);
            if (!started) {
                reject(new Error(`Failed to start RefServer: ${err.message}`));
            }
        });

        serverProcess.on('exit', (code) => {
            clearTimeout(startupTimeout);
            // Only reject if the process exits before startup completed.
            if (!started) {
                reject(new Error(`RefServer exited unexpectedly with code ${code}`));
            }
        });
    });
}

export async function teardown(): Promise<void> {
    if (process.env.OPCUA_EXTERNAL_SERVER === '1') {
        return;
    }

    if (serverProcess) {
        const proc = serverProcess;
        serverProcess = null;
        await new Promise<void>((resolve) => {
            proc.on('exit', () => resolve());
            proc.kill('SIGKILL');
        });
    }
}
