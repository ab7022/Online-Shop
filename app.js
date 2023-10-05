const express = require("express");
const expressSession = require("express-session");
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const db = require("./data/databse");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");
const addCSRFToken = require("./middlewares/csrf-token");

const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const app = express();
const productsRoutes = require("./routes/products.routes");
const baseRoutes = require("./routes/base.routes");
const adminRoutes = require("./routes/admin.routes");
const protectRoutesMiddleware = require("./middlewares/protect-routes")
// Import your session configuration function
const createSessionConfig = require("./config/session");
const sessionConfig = createSessionConfig();

app.use(cookieParser()); // Required for csurf to read cookies
// app.use(csrf({ cookie: true }));

// // Move this middleware below csrf middleware
// app.use(addCSRFToken);

// Remove this redundant middleware
// app.use((req, res, next) => {
//     const csrfToken = req.csrfToken();
//     if (csrfToken !== req.body._csrf) {
//         // Handle CSRF token mismatch error
//         return res.status(403).send('Invalid CSRF token');
//     }
//     next();
// });
 // Make sure this matches the name of your CSRF field in the form


// Initialize session middleware
app.use(expressSession(sessionConfig));

app.use(checkAuthStatusMiddleware);
app.use(authRoutes);
app.use(productsRoutes);
app.use(baseRoutes);
app.use(protectRoutesMiddleware)
app.use("/admin", adminRoutes);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("views/admin", path.join(__dirname, "views/admin"));

app.use(express.static("public"));


app.use("/products/assets", express.static("product-data"));
app.use(express.urlencoded({ extended: false }));

db.connectToDatabase().then(function () {
    app.listen(3000, () => {
        console.log('Server started on port 3000');
    });
}).catch(function (error) {
    console.log("Failed to connect to Database");
    console.log(error);
});
