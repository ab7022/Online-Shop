const express = require("express");
const expressSession = require("express-session");
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const db = require("./data/databse");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");

const app = express();
const productsRoutes = require("./routes/products.routes");
const baseRoutes = require("./routes/base.routes");

// Import your session configuration function
const createSessionConfig = require("./config/session");
const sessionConfig = createSessionConfig();

// Initialize session middleware
app.use(expressSession(sessionConfig));

app.use(checkAuthStatusMiddleware);
app.use(authRoutes);
app.use(productsRoutes);
app.use(baseRoutes);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

db.connectToDatabase().then(function () {
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
}).catch(function (error) {
    console.log("Failed to connect to Database");
    console.log(error);
});
