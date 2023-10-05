const express = require("express");
const router = express.Router()

router.get("/",function(req,res){

    res.redirect("/products")
})

router.get("/401", function (req, res) {
    res.status(401).render("shared/401"); // Remove the extra 'res' object
});

router.get("/403", function (req, res) {
    res.status(403).render("shared/403"); // You might want to render a different template here, e.g., "shared/403"
});


module.exports = router;
