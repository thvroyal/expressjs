var db = require('../db');
module.exports.authValidate = function(req,res,next) {
    if (!req.cookies.userID) {
        res.redirect('/auth/login');
        return;
    }
    var id = db.get('users').find({id: req.cookies.userID}).value();
    if (!id) {
        res.redirect('/auth/login');
        return;
    }
    next();
}