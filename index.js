require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var userRouter = require('./routes/user.route');
var authRouter = require('./routes/auth.route');
var productRouter = require('./routes/product.route');

var authValidate = require('./validate/auth.validate');

const app = express();
const port = 3000;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('view engine','pug');
app.set('views','./views');
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));
//Home
app.get('/', (req,res) => {
    res.render('index');
});

app.use('/user',authValidate.authValidate,userRouter);
app.use('/auth',authRouter);
app.use('/product',productRouter);
app.listen(port,()=> console.log('Start server at http://localhost:'+port));