const express = require("express");
const app = express();
const expressSession = require("express-session");
const path = require("path");
const authRoutes = require("./routes/auth.routes");
const ordersRoutes = require("./routes/orders.routes");
const db = require("./data/databse");
const checkAuthStatusMiddleware = require("./middlewares/check-auth");
const notFoundMiddleware = require("./middlewares/not-found");

const updateCartPricesMiddleware = require("./middlewares/update-cart-prices");
const addCSRFToken = require("./middlewares/csrf-token");
const cookieParser = require('cookie-parser');



const productsRoutes = require("./routes/products.routes");
const baseRoutes = require("./routes/base.routes");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");
const protectRoutesMiddleware = require("./middlewares/protect-routes")
const cartMiddleware = require("./middlewares/cart")
const createSessionConfig = require("./config/session");
const sessionConfig = createSessionConfig();

app.use(cookieParser()); 

app.use(expressSession(sessionConfig));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));

app.use(cartMiddleware.initializeCart);
app.use(updateCartPricesMiddleware)
app.use(checkAuthStatusMiddleware);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("views/admin", path.join(__dirname, "views/admin"));
app.use("/orders",protectRoutesMiddleware, ordersRoutes);
app.use("/admin", protectRoutesMiddleware,adminRoutes);
app.use("/cart",cartRoutes);

app.use(authRoutes);
app.use(productsRoutes);
app.use(baseRoutes);
app.use(notFoundMiddleware)
    

let port = 3000
if(process.nextTick.PORT){
    port = process.env.PORT
}


db.connectToDatabase().then(function () {
    app.listen(port, () => {
        console.log('Server started on port 3000');
    });
}).catch(function (error) {
    console.log("Failed to connect to Database");
    console.log(error);
});
