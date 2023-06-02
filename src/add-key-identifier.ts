import { ethers } from "ethers";
import { agent } from "./veramo/setup.js";

async function main() {
    const alias = process.argv[2];

    if (!alias) {
        console.log('No alias provided. Usage: npm run id:create --alias <alias_name>');
        return;
    }
    try{
        const identity = await agent.didManagerFind({alias})
        const did = identity[0]

        const key = await agent.keyManagerCreate({
            kms: 'local',
            type: 'Secp256k1',
        });
        console.log(key)
        await agent.didManagerAddKey({ 
            did: did.did,
            key,
        });
    }catch(error) {
        console.log(error)
    }
}

// handle error
main().catch(console.log)
