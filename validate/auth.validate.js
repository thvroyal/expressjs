var User = require('../models/user.model');
module.exports.authValidate = function(req,res,next) {
    if (!req.signedCookies.userID) {
        res.redirect('/auth/login');
        return;
    }
    var user = User.findById(req.signedCookies.userID);
    if (!user) {
        res.redirect('/auth/login');
        return;
    }
    res.locals.user = user;
    next();
}