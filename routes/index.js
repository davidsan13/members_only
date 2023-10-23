var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: req.user});
});

router.get('/sign-up', user_controller.user_create_get)

router.post('/sign-up', user_controller.user_create_post)

router.get('/login', (req, res) =>
  res.render('login')
)


router.get('/log-out', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/')
  })
})
module.exports = router;
