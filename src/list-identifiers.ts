import { ethers } from "ethers";
import { agent } from "./veramo/setup.js";

async function main() {
    const identifiers = await agent.didManagerFind()

    console.log('=================================');
    for (const id of identifiers) {
        console.log(id)

        console.log(`Alias: ${id.alias || "No alias"}`);
        console.log(`Services:`);
        for(const service of id.services) {
            console.log(`\t Service: ${service}`);
        }
        console.log(`Keys: `);
        for(const key of id.keys) {
            process.stdout.write(`  `);
            console.log(key);
        }

        const provider = ethers.getDefaultProvider('sepolia');
        const balance = await provider.getBalance(id.provider.split(':')[3]);
        console.log(`Balance: ${ethers.utils.formatEther(balance)}`);

        console.log(`Ethr Address: ${id.did.split(':')[3]}`);
        console.log(`DID: ${id.did}`);
        console.log('=================================');
    }
}

// handle error
main().catch(console.log)