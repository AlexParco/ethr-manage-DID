import { agent } from "./veramo/setup.js";

async function main() {
    const alias = process.argv[2];

    if (!alias) {
        console.log('No alias provided. Usage: npm run id:create --alias <alias_name>');
        return;
    }

    const identity = await agent.didManagerCreate({
        alias: alias,
        provider: 'did:ethr:rinkeby'
    })

    console.log(`New identity created`)
    console.log(identity)
}

// handle error
main().catch(console.log)