var Session = require('../models/session.model');
module.exports = {
    updateCartNum: (req,res,next) => {
        var sessionId = req.signedCookies.sessionId;
        Session.findById(sessionId).then(function(currentCart) {
            let numCart = currentCart.cart.reduce((total,item) => total += item.quantity,0);
            res.locals.numCart = numCart;
        })     
        next();   
    }
}