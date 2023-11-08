const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let database;
let mongodbUrl = "mongodb://localhost:27017";

if (process.env.MONGODB_URL) {
  mongodbUrl = process.env.MONGODB_URL;
}
async function connectToDatabase() {
  try {
    const client = await MongoClient.connect(mongodbUrl);
    database = client.db("online-shop");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error; // You may choose to handle this error differently
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
