import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config({ path: "./src/.env" });

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully");
        return client.db("Auth"); // Replace with actual DB name
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

export default connectDB;
