var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController')
const message_controller = require('../controllers/messageController')
/* GET home page. */
router.get('/', message_controller.index_get)

// user route
router.get('/signup', user_controller.user_create_get)

router.post('/signup', user_controller.user_create_post)

router.get('/login', user_controller.user_login_get)

router.post('/login', user_controller.user_login_post);

router.get('/logout', user_controller.user_logout_get);

router.get('/join', user_controller.user_join_get);

router.post('/join', user_controller.user_join_post);

router.get('/user/:id/update', user_controller.user_update_get)

router.post('/user/:id/update', user_controller.user_update_post)

router.get('/user/:id/delete', user_controller.user_delete_get)

router.post('/user/:id/delete', user_controller.user_delete_post)



//message route
router.get('/message', message_controller.message_get)

// Create message
router.get('/message/create', message_controller.message_create_get)

router.post('/create', message_controller.message_create_post)

// Delete message
router.get('/message/:id/delete', message_controller.message_delete_get)

router.get('/message/:id/delete', message_controller.message_delete_post)

// Edit message 
router.get('/message/:id/update', message_controller.message_update_get)

router.post('/message/:id/update', message_controller.message_update_post)

module.exports = router;
