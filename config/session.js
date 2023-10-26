const expressSession = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(expressSession);

function createSessionStore() {
    const store = new MongoDbStore({
        uri: "mongodb://localhost:27017/online-shop",
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
            maxAge: 60 * 60 * 1000, 
        }
    };
}

module.exports = createSessionConfig;