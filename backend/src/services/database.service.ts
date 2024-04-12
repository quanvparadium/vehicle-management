import { MongoClient, ServerApiVersion, Db, Collection } from 'mongodb'
import User from '~/models/schemas/User.schema'
import { Driver } from '~/models/schemas/Driver.schema'
import { Trip } from '~/models/schemas/Trip.schema'
import RefreshToken from '~/models/schemas/RefreshToken.schema' 
/**
 * Please import SCHEMA in here
 */

import dotenv from 'dotenv'
dotenv.config()

/**
 * Please don't modify below code
 */
const dataUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@vehiclemanagement.sdtfwan.mongodb.net/`
class DatabaseService {
    private client: MongoClient
    private db: Db
    constructor() {
        this.client = new MongoClient(dataUrl, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            }
        })
        this.db = this.client.db(process.env.DB_NAME)
    }
    async connect() {
        try {
            // Connect the client to the server	(optional starting in v4.7)
            await this.client.connect()
            // Send a ping to confirm a successful connection
            await this.db.command({ ping: 1 })
            console.log('Pinged your deployment. You successfully connected to MongoDB!')
            console.log('Database name', process.env.DB_NAME)
        } catch (error) {
            console.log('Error', error)
            throw error
        }
    }

    /**
     * Please write GET collection function in here
     */
    // Example
    // get users(): Collection<User> {
    //     return this.db.collection(process.env.DB_USERS_COLLECTION as string)
    // }
    get users(): Collection<User> {
        return this.db.collection(process.env.DB_USERS_COLLECTION as string)
    }

    get drivers(): Collection<Driver> {
        // return this.db.collection(process.env.DB_DRIVERS_COLLECTION as string)
        return this.db.collection('drivers')
    }
    
    get trips(): Collection<Trip> {
        return this.db.collection('trips')
    }

    get refreshTokens(): Collection<RefreshToken> {
        return this.db.collection(process.env.DB_REFRESH_TOKEN_COLLECTION as string)
    }

    async close() {
        await this.client.close()
    }
}

const databaseService = new DatabaseService()
export default databaseService
