require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL);

var userRouter = require('./routes/user.route');
var authRouter = require('./routes/auth.route');
var productRouter = require('./routes/product.route');
var cartRouter = require('./routes/cart.route');

var authValidate = require('./validate/auth.validate');
var sessionValidate = require('./validate/session.validate');
var updateCart = require('./controllers/cartNum.controller');

const app = express();
const port = 3000;
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.set('view engine','pug');
app.set('views','./views');
app.use(express.static('public'));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.static('public'));
app.use(sessionValidate,updateCart.updateCartNum);
//Home
app.get('/', (req,res) => {
    res.render('index');
});

app.use('/user',authValidate.authValidate,userRouter);
app.use('/auth',authRouter);
app.use('/product',productRouter);
app.use('/cart',cartRouter);
app.listen(port,()=> console.log('Start server at http://localhost:'+port));