const shortid = require('shortid');
const Session = require('../models/session.model');

module.exports = function (req,res,next) {
    if (!req.signedCookies.sessionId) {
        let currentCart = new Session;
        let sessionId = currentCart._id;
        console.log(sessionId);
        res.cookie("sessionId",sessionId,{
            signed: true
        });
        currentCart.save();
    }
    next();
}