var db = require('../db');
var User = require('../models/user.model');
const shortid = require('shortid');

module.exports = {
    index: (req,res) => {
        User.find().then(function(users) {
            res.render('user', {
                users: users,
                key: ''
            })
        })
       
    },
    search: (req,res) => {
        var q = req.query.q;
        var patt = new RegExp(q,'i');
        User.find({name: patt}).then(function(usersFilter) {
            res.render('user',{
                users : usersFilter,
                key: q
            });
        })
    },
    profile: (req,res) => {
        var id = req.params.id;
        User.findById(id).then(function(userProfile) {
            res.render('user/view',{
                user: userProfile
            })
        })
    },
    create: (req,res) => {
        res.render('user/create');
    },
    postCreate: (req,res) => {
        req.body.avatar = req.file.path.split("\\").slice(1).join('\\');
        User.create(req.body, function (err, res) {
            
        });
        res.redirect('/user');
    }
}