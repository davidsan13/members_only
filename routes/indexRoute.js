var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user});
});

// user route
router.get('/user/signup', user_controller.user_create_get)

router.post('/user/signup', user_controller.user_create_post)

router.get('/user/:id/update', user_controller.user_update_get)

router.post('/user/:id/update', user_controller.user_update_post)

router.get('/user/:id/delete', user_controller.user_delete_get)

router.post('/user/:id/delete', user_controller.user_delete_post)

router.get('/log-in', user_controller.user_login_get)

router.post('/log-in', user_controller.user_login_post);

router.get('/log-out', user_controller.user_logout_get)

//message route
router.get('/message_room', message_controller.message_room_get)

// Create message
router.get('/message_room/create', message_controller.mesage_create_get)

router.post('/message_room/create', message_controller.message_create_post)

// Delete message
router.get('/message_room/:id/delete', message_contoller.message_delete_get)

router.get('/message_room/:id/delete', message_controller.message_delete_post)

// Edit message 
router.get('/message_room/:id/update', message_controller.message_update_get)

router.post('/message_room/:id/update', message_controller.message_update_post)

module.exports = router;
