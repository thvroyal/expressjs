const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('view engine','pug');
app.set('views','./views');
var users =  [
    {id: 1, name: 'Hoang Roy'},
    {id: 2, name: 'Quang Hung'}
]

//Home
app.get('/', (req,res) => {
    res.render('index', {
      name: 'Hoang Viet'
       
    });
});

//User
app.get('/user', (req,res) => {
    res.render('user', {
        users: users
    })
});

//Search GET
app.get('/user/search',(req,res) => {
    var q = req.query.q;
    var matchedUsers = users.filter(index => index.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);
    res.render('user',{
        users : matchedUsers,
        key: q
    });
});

//POST create user

app.listen(port,()=> console.log('Start server at http://localhost:'+port));