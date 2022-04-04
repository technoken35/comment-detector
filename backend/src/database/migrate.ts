import DatabaseHelper from './DatabaseHelper'

export async function createCollections(){
    const collections = ['users', 'teams'];
    const dbHelper = new DatabaseHelper(process.env.DB_NAME || '');

    for (const collection of collections) {
        const collectionExists = await dbHelper.collectionExists(collection)
        if (!collectionExists){
            dbHelper.createCollection(collection).catch((e) => console.error(e));
        }
    }
}
