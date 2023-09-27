const user = require("../models/user.model");

function createUserSession(req,res,action){
    req.session.uid = user._id ///.String()
    req.session.save(action)
}
module.exports = {
    createUserSession:createUserSession
}