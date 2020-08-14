const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const shortid = require('shortid');
const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ users: []})
  .write()
const app = express();
const port = 3000;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('view engine','pug');
app.set('views','./views');

//Home
app.get('/', (req,res) => {
    res.render('index', {
      name: 'Hoang Viet'
       
    });
});

//User
app.get('/user', (req,res) => {
    res.render('user', {
        users: db.get('users').value(),
        key: ''
    })
});

//Search GET
app.get('/user/search',(req,res) => {
    var q = req.query.q;
    var matchedUsers = db.get('users').value().filter(index => index.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
    res.render('user',{
        users : matchedUsers,
        key: q
    });
});

// View page
app.get('/user/view/:id',(req,res) => {
    var id = req.params.id;
    var user = db.get('users').find({id:id}).value();
    res.render('./user/view',{
        users: user
    })
})
//POST create user
app.get('/user/create',(req,res) => {
    res.render('./user/create');
});

app.post('/user/create',(req,res) => {
    req.body.id = shortid.generate();
    db.get('users')
        .push(req.body)
        .write();
    res.redirect('/user');
})
app.listen(port,()=> console.log('Start server at http://localhost:'+port));