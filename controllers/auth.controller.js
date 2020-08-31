var md5 = require('md5');
var User = require('../models/user.model');


module.exports = {
    login: (req, res) => {
        res.render('auth/login')
    },
    postLogin: (req, res) => {
        var email = req.body.email;
        var password = req.body.password;
        User.find({
            email: email
        }).then(function (userLog) {
            if (!userLog.length) {
                res.render('auth/login', {
                    errors: [
                        "User is not found."
                    ]
                });
                return;
            };
            var hashedPassword = md5(password);
            if (userLog[0].password !== hashedPassword) {
                res.render('auth/login', {
                    errors: [
                        "Password is wrong."
                    ],
                    value: req.body
                });
                return;
            };
            res.cookie("userID", userLog[0]._id, {
                signed: true
            });
            res.redirect('/user');
        })
    }
}