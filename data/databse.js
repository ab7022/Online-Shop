// const mongodb = require("mongodb");
// const { default: mongoose } = require("mongoose");
// const MongoClient = mongodb.MongoClient;
// let database;
// let mongodbUrl = "mongodb://localhost:27017";

// if (process.env.MONGODB_URL) {
//   mongodbUrl = process.env.MONGODB_URL;
// }
// async function connectToDatabase() {
//   try {
//     const client = await MongoClient.connect(mongodbUrl);
//     database = client.db("online-shop");
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//     throw error; // You may choose to handle this error differently
//   }
// }
// function getDb() {
//   if (!database) {
//     throw new Error("You must connect first");
//   }
//   return database;
// }
// module.exports = {
//   connectToDatabase: connectToDatabase,
//   getDb: getDb,
// };


// mongoose.set("strictQuery",false)
// const connectDb = async ()=> {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URL)
//     console.log(`mongoDb connected: ${conn.connection.host}`)
//   } catch (error) {
//     console.log(error)
//     process.exit(1)
//   }
// }

// connectDb.then(()=> {
//   app.listen(PORT, ()=>{
//     console.log(`Listening on PORt ${PORT}`)
//   })
// })
require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express")
const app = express()
mongoose.set("strictQuery", false);

let database;

const connectToDatabase = async () => {
  try {
    console.log('MongoDB URL:', process.env.MONGODB_URL);
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected: ${connection.connection.host}`);
    database = connection.connection.db;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};


const getDb = () => {
  if (!database) {
    throw new Error("You must connect to the database first");
  }
  return database;
};

// Call the connectToDatabase function
connectToDatabase();

// You can export the connectToDatabase and getDb functions
module.exports = {
  connectToDatabase,
  getDb,
};
const PORT = process.env.PORT || 4000;

// Assuming `app` and `PORT` are defined elsewhere in your code
const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
  });
};

// Call the startServer function
startServer();
