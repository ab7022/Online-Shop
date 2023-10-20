function checkAuthStatus(req, res, next) {
    const uid = req.session.uid;
    // console.log("UID:",uid)

    if (!uid) {
        // console.log("User is not authenticated"); // Debugging
        res.locals.isAuth = false; // User is not authenticated
        return next();
       
    }
    // console.log("User is authenticated"); // Debugging
    res.locals.uid = uid;
    res.locals.isAuth = true;
     // User is authenticated
     res.locals.isAdmin = req.session.isAdmin
    console.log(res.locals.isAdmin)
    next();
}

module.exports = checkAuthStatus;
