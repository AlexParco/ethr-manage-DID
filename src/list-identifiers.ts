import { ethers, providers } from "ethers";
import { agent } from "./veramo/setup.js";
import provider from 'eth-provider'
import { getResolver } from "ethr-did-resolver";

const IFURA_API_KEY =  "6fb3131d92b047b3b7e00ffc4c431b85"

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

        const provider = new ethers.providers.InfuraProvider('sepolia', '6fb3131d92b047b3b7e00ffc4c431b85')

        const wallet = new ethers.Wallet(id.did.split(':')[3].slice(4), provider)

        const balance = await provider.getBalance(wallet.address);

        console.log(`Balance: ${ethers.utils.formatEther(balance)}`);

        console.log(`Ethr Address: ${wallet.address}`);
        console.log(`DID: ${id.did}`);
        console.log('=================================');
    }
}

// handle error
main().catch(console.log)