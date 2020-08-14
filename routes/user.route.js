var express = require('express');
var db = require('../db');
var router = express.Router();
const shortid = require('shortid');

router.get('/', (req,res) => {
    res.render('user', {
        users: db.get('users').value(),
        key: ''
    })
});

//Search GET
router.get('/search',(req,res) => {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(index => index.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
    res.render('user',{
        users : matchedUsers,
        key: q
    });
});

// View page
router.get('/view/:id',(req,res) => {
    var id = req.params.id;
    var user = db.get('users').find({id:id}).value();
    res.render('user/view',{
        users: user
    })
})
//POST create user
router.get('/create',(req,res) => {
    res.render('user/create');
});

router.post('/create',(req,res) => {
    req.body.id = shortid.generate();
    db.get('users')
        .push(req.body)
        .write();
    res.redirect('/user');
});
module.exports = router;