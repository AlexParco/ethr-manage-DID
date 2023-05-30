import { agent } from "./veramo/setup.js";

async function main() {
    const identifiers = await agent.didManagerFind();

    for (const id of identifiers) {
        await agent.didManagerDelete({ did: id.did });
        console.log(`DID '${id.did}' deleted successfully`);
    }

    console.log(`Total DIDs deleted: ${identifiers.length}`);
}

main().catch(console.log)