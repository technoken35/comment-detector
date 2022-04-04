import {MongoClient, Db, Collection, Document} from "mongodb";

class DatabaseHelper {
    private client: MongoClient;
    private database: string;

    constructor(database: string) {
        this.database = database;
        this.client = new MongoClient(process.env.DB_CONNECTION_URI || '');
    }

    async getClient(): Promise<MongoClient>{
        if (!this.client){
            this.client = new MongoClient(process.env.DB_CONNECTION_URI || '');
        }

        await this.openConnection();

        return this.client
    }

    closeConnection(){
        this.client.close();
    }

    async openConnection(){
        this.client.connect();
    }

    async createCollection(name: string, closeConnection: boolean = false): Promise<Collection | undefined>{
        await this.client.connect()

        let collection: Collection|undefined;

        try{
            collection = await this.client?.db(this.database).createCollection(name);
        }catch(e){
            console.error(e);
        }finally {
            if (closeConnection) this.closeConnection();
        }

        return collection;
    }

    async collectionExists(name: string, closeConnection: boolean = false): Promise<boolean>{
        let collections: Collection[] | undefined;
        let collectionExists: boolean = false;

        try{
            await this.client.connect()
            collections = await this.client.db(process.env.DB_NAME).collections()
            collectionExists = collections.some((collection) => collection.collectionName === name);
        }catch(e: any){
            console.error(e.message, '):');
        }finally {
            if (closeConnection) this.closeConnection();
        }

        return collectionExists;
    }

}

export default DatabaseHelper;