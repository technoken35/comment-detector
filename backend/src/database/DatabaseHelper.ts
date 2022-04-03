import {MongoClient, Db, Collection, Document} from "mongodb";

class DatabaseHelper {
    private client?: MongoClient;
    private database: string;

    constructor(database: string) {
        this.database = database;
    }

    getClient(): MongoClient{
        if (!this.client){
            this.client = new MongoClient(process.env.DB_CONNECTION_URI || '');
        }

        this.openConnection().catch(console.error);

        return this.client
    }

    closeConnection(){
        this.client?.close();
    }

    async openConnection(){
        this.client?.connect();
    }

    async createCollection(name: string, closeConnection: boolean = false): Promise<Collection | undefined>{
        this.getClient();

        let collection: Collection|undefined;

        try{
            collection = await this.client?.db(this.database).createCollection(name);
        }catch{

        }finally {
            if (closeConnection) this.closeConnection();
        }

        return collection;
    }

    collectionExists(name: string): boolean{
        return true;
    }

}