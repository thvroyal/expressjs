var Session = require('../models/session.model');
module.exports = {
    addToCart: (req,res,next) => {
        var productId = req.params.productId;
        var sessionId = req.signedCookies.sessionId;
        var numCart = 0;
        if (!sessionId) {
            res.redirect('/product');
            return;
        }
        Session.findById(sessionId).then(function(currentCart) {
            let current = -1;
            currentCart.cart.forEach((item,index) => {
                if (item.product === productId) current = index;
                numCart += item.quantity;
            });
            let newItem = {
                product : productId,
                quantity : 1
            }
            if (current === -1) currentCart.cart.push(newItem);
            else currentCart.cart[current].quantity += 1;
            currentCart.save();
        })        
        res.redirect('back');
    }
}