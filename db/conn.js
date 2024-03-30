import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config()
const connectionString = process.env.MONGO_URL;
const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
  console.log(process.env.MONGO_URL);
} catch(e) {
  console.error(e);
}
let db = conn.db("codefun");
export default db;