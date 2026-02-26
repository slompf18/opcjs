

import { Client, ConfigurationClient, Id, IssuerConfiguration, IssuerToken, UserIdentity } from 'opcuajs';
import http from 'http';
import open from 'open';
import * as openidClient from 'openid-client';
import { AddressInfo } from 'net';
import { json } from 'stream/consumers';


const endpointUrl = 'wss://050756e302aa:62542/Test/ReferenceServer/';

let client: Client | null = null;

async function shutdown(): Promise<void> {
  console.log('\nShutting down gracefully...');
  if (client) {
    try {
      await client.disconnect();
      console.log('Disconnected successfully!');
    } catch (error) {
      console.error('Error during disconnect:', error);
    }
  }
  process.exit(0);
}


async function login(definition: IssuerConfiguration): Promise<IssuerToken> {
  return new Promise(async (resolve, reject) => {
    const config = await openidClient.discovery(new URL(definition.authorityUrl), definition.resourceId );

    // PKCE
    const code_verifier = openidClient.randomPKCECodeVerifier();
    const code_challenge = await openidClient.calculatePKCECodeChallenge(code_verifier);

    // Temporary HTTP server
    const server = http.createServer(async (req, res) => {
      if (!req?.url?.startsWith('/callback')) return;

      const currentUrl = new URL(req.url!, `http://${req.headers.host}`);
      try {
        const tokens = await openidClient.authorizationCodeGrant(
          config,
          currentUrl,
          { pkceCodeVerifier: code_verifier }
        );

        res.end('Login done. You may close this window.');

        server.close();
        const issuerToken = new IssuerToken(JSON.stringify(tokens));
        resolve(issuerToken);
      } catch (err) {
        res.end('Login failed. You may close this window.');
        server.close();
        console.error('Error during token exchange:', err);
        reject(err);
      }
    });

    server.listen(0, () => {
      if (!server) return;
      const address = server.address() as AddressInfo;
      const port = address.port;
      const redirectUri = `http://localhost:${port}/callback`;

      const authUrl = openidClient.buildAuthorizationUrl(config, {
        scope: 'full_access',
        code_challenge,
        code_challenge_method: 'S256',
        redirect_uri: redirectUri
      });

      console.log('Opening browser for login…');
      
      // 'https://api.euc1.descope.com/oauth2/v1/apps/authorize?scope=full_access&
      // code_challenge=u4KWnS3fFKeUwaHIZ_xLfe_R4Qfk-O2XWqV5O200nPs&
      // code_challenge_method=S256&redirect_uri=http%3A%2F%2Flocalhost%3A33151%2Fcallback&client_id=UGV1YzEzMjhFdDMxSzRDQ0ZmTGtmTm1VMndDemdHc3I6VFBBMzhweGtlcmJUVjlXZzVxQlJ4QjlKWk1lSmxK&
      // response_type=code'
      open(authUrl.href);
    });
  });
}


// Handle termination signals
process.on('SIGINT', shutdown);  // Ctrl+C
process.on('SIGTERM', shutdown); // Kill command

async function main(): Promise<void> {
  // console.log('test login');

  // const issuerEndpoint = new IssuerConfiguration(
  //   "UGV1YzEzMjhFdDMxSzRDQ0ZmTGtmTm1VMndDemdHc3I6VFBBMzhweGtlcmJUVjlXZzVxQlJ4QjlKWk1lSmxK",
  //   "https://api.euc1.descope.com/v1/apps/Peuc1328Et31K4CCFfLkfNmU2wCzgGsr/.well-known/openid-configuration",
  //   "http://opcfoundation.org/UA-Profile/Security/UserToken/Server/JsonWebToken",
  //   "https://api.euc1.descope.com/oauth2/v1/apps/token",
  //   "https://api.euc1.descope.com/oauth2/v1/apps/authorize",
  //   ["authorization_code", "client_credentials"],
  //   ["full_access"]
  // );

  // await login(issuerEndpoint);
  // return;
  console.log('Creating OPC UA Client...');

  const configuration = ConfigurationClient.getSimple('MyNodeOPCUAClient', 'eos');
  // client = new Client(endpointUrl, configuration, UserIdentity.newWithUserName('sysadmin', 'demo'));
  client = new Client(endpointUrl, configuration, UserIdentity.newWithIssuerToken(login));

  try {
    await client.connect();
    console.log('Connected successfully!');

    const results = await client.read([Id.newId(2, 'Scalar_Simulation_Double')])
    for (let r of results) {
      console.log(r.status, r.value)
    }

    client.subscribe([Id.newId(2, 'Scalar_Simulation_Double')], (datas) => {
      for (let data of datas) {
        console.log('Subscription value received: ', data.id.toString(), data.value);
      }
    })

    console.log('Press Ctrl+C to disconnect and exit...');

    // Keep the process alive to receive messages
    await new Promise(() => { }); // Never resolves, keeps process running

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error:', error.message);
    } else {
      console.error('Error:', error);
    }
    process.exit(1);
  }
}

main().catch(console.error);
