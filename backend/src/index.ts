import express, {Request, Response, NextFunction, Application} from "express";
import * as dotenv from "dotenv";
import {MongoClient} from "mongodb";
import {createCollections} from "./database/migrate";

dotenv.config()
const app: Application = express()
console.log(process.env.DB_CONNECTION_URI, 'adl;fjadfjaflkasjdfklsfj');
const client: MongoClient = new MongoClient(process.env.DB_CONNECTION_URI || '')
const port: number = 3000

// run db "migrations"
// createCollections();

app.get('/', (request: Request, response: Response) => {
    response.send(process.env.DB_CONNECTION_URI);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    console.log(process.env.DB_CONNECTION_URI);
});