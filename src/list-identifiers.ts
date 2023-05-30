import { agent } from "./veramo/setup.js";
import { ethers } from 'ethers';

const IFURA_API_KEY =  "101b75dde86248f7992b9504f13ce8dd"

const KMS_SECRET_KEY =  "9069ca5ae22527238513e8d2301962ad95cae8fd60f290ca498951c7415a0b8c"

async function main() {
    const identifiers = await agent.didManagerFind()

    console.log('------------------------------');
    for (const id of identifiers) {
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
        const address = id.did.split(':')[id.did.split(':').length-1]
        // if (id.provider) {
        //     const provider = new ethers.InfuraProvider('rinkeby');
        //     const balance = await provider.getBalance(address.trim());
        //     console.log(`Balance: ${ethers.formatEther(balance)}`);
        // }
        console.log(`Ethr Address: ${id.provider}`);
        console.log(`DID: ${id.did}`);
        console.log('------------------------------');
    }
}

// handle error
main().catch(console.log)