var expressJwt = require("express-jwt");
//signout
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully"
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  UserProperty: "auth",
  algorithms:['RS256']
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED"
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 2) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied"
    });
  }
  next();
};

exports.isShop = (req, res, next) => {
  if (req.profile.role === 1) {
    return res.status(403).json({
      error: "You are not Shop Owner, Access denied"
    });
  }
  next();
};