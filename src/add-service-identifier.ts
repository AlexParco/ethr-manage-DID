import { DIDDocument, IIdentifier } from "@veramo/core";
import { agent } from "./veramo/setup.js"

async function main() {
    const identifiers = await agent.didManagerFind()

    const alias = process.argv[2];
    if (!alias) {
        console.log('No alias provided. Usage: npm run id:add-service --alias <alias_name>');
        return;
    }

    const service = {
    };

    // const did = identifiers.find((id) => id.alias === alias);
    const allDids: IIdentifier[] = await agent.didManagerFind({alias})
    let didDetails: IIdentifier;
    let did: string;

    didDetails = allDids[0]; 
    did = didDetails.did

    console.log(did)
    await agent.didManagerAddService({
        did, 
        service: {
            id: 'example-service',
            type: 'ExampleService',
            serviceEndpoint: 'https://example.com/service-endpoint',
            description: 'Example Service Description'
        }
    });

}

main().catch(console.log)