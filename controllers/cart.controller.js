var db = require('../db');
module.exports = {
    addToCart: (req,res,next) => {
        var productId = req.params.productId;
        var sessionId = req.signedCookies.sessionId;
        if (!sessionId) {
            res.redirect('/product');
            return;
        }
        var quantity = db.get("sessions")
                         .find( {id:sessionId})
                         .get('cart.'+productId,0).value();   
        db.get("sessions")
            .find( {id: sessionId} )
            .set('cart.'+ productId,quantity+1)
            .write();
        res.redirect('back');
    }
}