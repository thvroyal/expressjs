var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');

router.get('/',controller.index);

//Search GET
router.get('/search',controller.search);

// View page
router.get('/view/:id',controller.profile)
//POST create user
router.get('/create',controller.createForm);

router.post('/create',controller.redirectUserPage);
module.exports = router;