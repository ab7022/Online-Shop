const mongodb = require("mongodb");
const { default: mongoose } = require("mongoose");
const MongoClient = mongodb.MongoClient;
let database; 
let mongodbUrl = "mongodb+srv://abdul:Y59ILJDZ9UwqgAVJ@cluster0.argigth.mongodb.net/online-shop";



if (process.env.MONGODB_URL) {
  mongodbUrl = process.env.MONGODB_URL;
}
async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(mongodbUrl);
    database = client.db("online-shop");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; 
  }
}
function getDb() {
  if (!database) {
    throw new Error("You must connect first");
  }
  return database;
}
module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};


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

// require('dotenv').config();

// const mongoose = require("mongoose");
// const express = require("express");
// const app = express();
// mongoose.set("strictQuery", false);

// let database;

// const connectToDatabase = async () => {
//   try {
//     console.log('MongoDB URL:', process.env.MONGODB_URL);
//     const connection = await mongoose.connect(process.env.MONGODB_URL);
//     console.log(`MongoDB connected: ${connection.connection.host}`);
//     database = connection.connection.db;
//   } catch (error) {
//     console.error(error);
//     process.exit(1);
//   }
// };

// const getDb = () => {
//   if (!database) {
//     throw new Error("You must connect to the database first");
//   }
//   return database;
// };

// // Modified connectToDatabase to return a Promise
// const connectToDatabasePromise = () => {
//   return new Promise((resolve, reject) => {
//     connectToDatabase()
//       .then(() => resolve())
//       .catch((error) => reject(error));
//   });
// };

// // Use the Promise to ensure the database is connected before starting the server
// connectToDatabasePromise()
//   .then(() => {
//     const PORT = process.env.PORT || 4000;

//     // Assuming `app` and `PORT` are defined elsewhere in your code
//     app.listen(PORT, () => {
//       console.log(`Server listening on PORT ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
// module.exports = {
//   connectToDatabase:connectToDatabase,
//   getDb:getDb
// }