import { agent } from "./veramo/setup.js";

async function main() {
    const identifiers = await agent.didManagerFind();

    const alias = process.argv[2];
    if (!alias) {
        console.log('No alias provided. Usage: npm run id:delete --alias <alias_name>');
        return;
    }

    const did = identifiers.find((id) => id.alias === alias);
    if (!did) {
        console.log(`No DID found with alias '${alias}'`);
        return;
    }

    await agent.didManagerDelete({did: did.did});
    console.log(`DID with alias '${alias}' deleted successfully`);
}

main().catch(console.log)