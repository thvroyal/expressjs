var express = require('express');
var router = express.Router();
var multer  = require('multer')
var controller = require('../controllers/user.controller');
var validate = require('../validate/user.validate');

var upload = multer({ dest: 'public/uploads' })
router.get('/',controller.index);

//Search GET
router.get('/search',controller.search);

// View page
router.get('/view/:id',controller.profile)
//POST create user
router.get('/create',controller.create);

router.post('/create',upload.single('avatar'),validate.postCreate, controller.postCreate);
module.exports = router;