function checkAuthStatus(req,res,next){
    const uid = req.session.uid
    if(!uid){
        return next()
    }
    res.locals.uid = uid
    res.local.isAuth = true
}
module.exports = checkAuthStatus