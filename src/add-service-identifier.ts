import { DIDDocument, IIdentifier } from "@veramo/core";
import inquirer from 'inquirer'
import { agent } from "./veramo/setup.js"
import { ethers } from "ethers";

async function main() {

    const alias = process.argv[2];
    if (!alias) {
        console.log('No alias provided. Usage: npm run id:add-service --alias <alias_name>');
        return;
    }

    const allDids: IIdentifier[] = await agent.didManagerFind({alias})
    let didDetails: IIdentifier;
    let did: string;

    didDetails = allDids[0]; 
    did = didDetails.did

    await agent.didManagerAddService({
        did, 
        service: {
            id: did + '#veramo',
            type: 'ExampleService',
            serviceEndpoint: 'https://example.com/service-endpoint',
            description: 'Veramo Api'
        }
    });

}

main().catch(console.log)