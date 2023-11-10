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
let database;

const connectToDatabase = async () => {
  try {
    console.log('MongoDB URL:', process.env.MONGODB_URL);
    const connection = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    connection.connection.on('connected', () => {
      console.log('MongoDB connected:', connection.connection.host);
      database = connection.connection.db; // Assign the connected database
    });

    connection.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      process.exit(1);
    });

    return connection.connection.db;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const startServer = async () => {
  try {
    await connectToDatabase(); // Wait for the database connection

    const PORT = process.env.PORT || 2000;

    // Assuming `app` is defined elsewhere in your code
    app.listen(PORT, () => {
      console.log(`Server listening on PORT ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();

function getDb() {
  if (!database) {
    throw new Error("You must connect first");
  }
  return database;
}
app.get('/', (req, res) => {
  res.send('Hello, this is the home route!');
});
module.exports = {
  connectToDatabase: connectToDatabase,
  getDb: getDb,
};
