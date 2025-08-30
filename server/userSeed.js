import mongoose from "mongoose";
import User from './models/user.js'
import bcrypt from 'bcrypt'
import connecttodatabase from './db/db.js'
const userregister=async()=>{
    await connecttodatabase();
    try{
        const hashpassword=await bcrypt.hash("admin2",10)
        const newuser=new User({
            name:"Admin2",
            email:"admin2@gmail.com",
            password:hashpassword,
            role:"admin"
        })
        await newuser.save()
        /*console.log("user saved");*/
    }catch(error){
        console.log(error)
    }
}
userregister();
/*import mongoose from "mongoose";
import User from "./models/user.js";
import bcrypt from "bcrypt";
import connecttodatabase from "./db/db.js";

const userRegister = async () => {
  await connecttodatabase(); // Ensure DB is connected

  try {
    if (mongoose.connection.readyState !== 1) {
      console.log("❌ Not connected to MongoDB!");
      return;
    }

    const hashPassword = await bcrypt.hash("admin", 10);
    const newUser = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashPassword,
      role: "admin",
    });

    await newUser.save(); // Insert user into DB
    console.log("✅ User saved successfully!");
  } catch (error) {
    console.log("❌ Error inserting user:", error);
  } finally {
    mongoose.connection.close(); // Close the connection after execution
  }
};

userRegister();*/
