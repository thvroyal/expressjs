var md5 = require('md5');
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
        var hashedPassword = md5(password);
        if (user.password !== hashedPassword) {
            res.render('auth/login',{
                errors:[
                    "Password is wrong."
                ],
                value: req.body
            });
            return;
        };
        res.cookie("userID",user.id,{
            signed: true
        });
        res.redirect('/user');
    }
}