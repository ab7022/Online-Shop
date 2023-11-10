// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// let database; 
// let mongodbUrl = "mongodb+srv://abdul:Y59ILJDZ9UwqgAVJ@cluster0.argigth.mongodb.net/online-shop";



// if (process.env.MONGODB_URL) {
//   mongodbUrl = process.env.MONGODB_URL;
// }
// async function connectToDatabase() {
//   try {
//     const client = await MongoClient.connect(mongodbUrl);
//     database = client.db("online-shop");
//   } catch (error) {
//     console.error("Error connecting to the database:", error);
//     throw error; 
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





require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();

const connectToDatabase = async () => {
  try {
    console.log('MongoDB URL:', process.env.MONGODB_URL);
    const connection = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB connected: ${connection.connection.host}`);
    return connection.connection.db;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const connectToDatabasePromise = () => {
  return new Promise((resolve, reject) => {
    connectToDatabase()
      .then((database) => resolve(database))
      .catch((error) => reject(error));
  });
};
function getDb() {
  if (!database) {
    throw new Error("You must connect first");
  }
  return database;
}
connectToDatabasePromise()
  .then((database) => {

    const PORT = process.env.PORT || 4000

    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

module.exports = {
  connectToDatabase: connectToDatabase,
  getDb:getDb
};
