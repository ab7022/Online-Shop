const user = require("../middlewares/check-auth");
function createUserSession(req, res, action, user) {
  console.log(user);
  if (user && user._id) {
    req.session.uid = user._id.toString();
    req.session.isAdmin = user.isAdmin;
  }
  req.session.save(action);
}
function destroyUserAuthSession(req) {
  req.session.uid = null;
  req.session.save();
}
module.exports = {
  createUserSession: createUserSession,
  destroyUserAuthSession: destroyUserAuthSession,
};
