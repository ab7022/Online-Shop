const expressSession = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(expressSession);

function createSessionStore() {
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
            maxAge: 60 * 60 * 1000, // Set to 1 hour (in milliseconds)
        }
    };
}

module.exports = createSessionConfig;