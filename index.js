const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRouter = require('./routes/user.route');

const app = express();
const port = 3000;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('view engine','pug');
app.set('views','./views');
app.use(express.static('public'));
app.use(cookieParser())
//Home
app.get('/', (req,res) => {
    res.render('index', {
      name: 'Hoang Viet'
       
    });
});

app.use('/user',userRouter);
app.listen(port,()=> console.log('Start server at http://localhost:'+port));