// const mongoDbStore = require("connect-mongodb-session");
const expressSession = require("express-session");

function createSessionStore() {
    const MongoDbStore = require("connect-mongodb-session")(expressSession); // Import and initialize the store properly
    const store = new MongoDbStore({
        uri: "mongodb://localhost:27017/online-shop", // Include the database name in the URI
        collection: "sessions"
    });
    return store;
}

function createSessionConfig() {
    return {
        secret: "super-secret",
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    };
}

module.exports = createSessionConfig;
