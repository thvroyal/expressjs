var db = require('../db.js');

module.exports = {
    login: (req,res) => {
        res.render('auth/login')
    },
    postLogin: (req,res) => {
        var email = req.body.email;
        var password = req.body.password;
        var user = db.get('users').find({email: email}).value();
        if (!user) {
            res.render('auth/login',{
                errors: [
                    "User is not found."
                ]
            });
            return;
        };
        if (user.password !== password) {
            res.render('auth/login',{
                errors:[
                    "Password is wrong."
                ],
                value: req.body
            });
            return;
        };
        res.cookie("userID",user.id);
        res.redirect('/user');
    }
}