var db = require('../db');
const shortid = require('shortid');

module.exports = {
    index: (req,res) => {
        res.render('user', {
            users: db.get('users').value(),
            key: ''
        })
    },
    search: (req,res) => {
        var q = req.query.q;
        var matchedUsers = db.get('users')
        .value()
        .filter(index => index.name.toLowerCase()
            .indexOf(q.toLowerCase()) !== -1);
        res.render('user',{
            users : matchedUsers,
            key: q
        });
    },
    profile: (req,res) => {
        var id = req.params.id;
        var user = db.get('users').find({id:id}).value();
        res.render('user/view',{
            users: user
        })
    },
    createForm: (req,res) => {
        res.render('user/create');
    },
    redirectUserPage: (req,res) => {
        req.body.id = shortid.generate();
        db.get('users')
            .push(req.body)
            .write();
        res.redirect('/user');
    }
}