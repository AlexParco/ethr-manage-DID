import { agent } from "./veramo/setup.js";

async function main() {
    const alias = process.argv[2];

    if (!alias) {
        console.log('No alias provided. Usage: npm run id:create --alias <alias_name>');
        return;
    }

    const identity = await agent.didManagerFind({alias})
    const did = identity[0]

    console.log(`New identity created`)

    const newKey = await agent.keyManagerCreate({
        type: 'Secp256k1',
        kms: 'local',
    });

    await agent.didManagerAddKey({ did: did.did, key: newKey});

}

// handle error
main().catch(console.log)
