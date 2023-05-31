import { createAgent, IDIDManager, IResolver, IDataStore, IKeyManager, IDataStoreORM} from '@veramo/core'

import { DIDStore, Entities, KeyStore, PrivateKey, PrivateKeyStore, migrations } from '@veramo/data-store'

import { DIDManager } from '@veramo/did-manager'

import { EthrDIDProvider  } from '@veramo/did-provider-ethr'

import { WebDIDProvider } from '@veramo/did-provider-web'
import { DIDResolverPlugin } from '@veramo/did-resolver'

import { KeyManager } from '@veramo/key-manager'

import { KeyManagementSystem, SecretBox } from '@veramo/kms-local'

import { Resolver } from 'did-resolver'
import { EthrDidController } from 'ethr-did-resolver'
import { getResolver as ethrDidResolver } from 'ethr-did-resolver'
import { getResolver as webDidResolver } from 'web-did-resolver'

import { DataSource } from "typeorm"; 

const IFURA_API_KEY =  "6fb3131d92b047b3b7e00ffc4c431b85"

const KMS_SECRET_KEY =  "9069ca5ae22527238513e8d2301962ad95cae8fd60f290ca498951c7415a0b8c"

const DATABASE_FILE = "database.sqlite"

const dbConnection = new DataSource({
    type: 'sqlite',
    database: DATABASE_FILE,
    synchronize: false,
    migrations: migrations,
    migrationsRun: true,
    logging: ['error', 'info', 'warn'],
    entities: Entities
})

export const agent = createAgent<IDIDManager 
& IKeyManager & IDataStore & IDataStoreORM & IResolver>({
    plugins: [
        new KeyManager({
            store: new KeyStore(dbConnection),
            kms: {
                local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY)))
            }
        }),
        new DIDManager({
            store: new DIDStore(dbConnection),
            defaultProvider: 'did:ethr:goerli',
            providers: {
                'did:ethr:goerli': new EthrDIDProvider({
                    defaultKms: 'local',
                    network: 'goerli',
                    rpcUrl: 'https://goerli.infura.io/v3/' + IFURA_API_KEY,
                }),
                'did:web': new WebDIDProvider({
                    defaultKms: 'local'
                }),
            }
        })
    ]
})