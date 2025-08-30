/*import {MongoClient} from "mongodb";
import uri from "../uri.js";
console.log(uri);
const client=new MongoClient(uri);

const connecttodatabase=async()=>{
    try{
        await client.connect()
        console.log("connected to db")
    }catch(error){
        console.log(error)
    }
}
export default connecttodatabase*/

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

//import uri from "../uri.js";

const connecttodatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL); 
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

export default connecttodatabase;
