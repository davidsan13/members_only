const bcrypt = require("bcryptjs");
const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const helper = require("../public/javascripts/utility")

// index 

// user controller
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render("sign_up_form", {
    user: req.user,
  })
})

exports.user_create_post = [
  // Validate and Sanitize the field.
  body("firstName", "First name must contain at least 2 characters")
    .trim()
    .isLength({min: 2})
    .escape(),
  
  body("lastName", "last name must contain at least 2 characters")
    .trim()
    .isLength({min: 2})
    .escape(),
  
  body("email", "email must contain at least 2 characters")
    .trim()
    .escape()
    .normalizeEmail()
    .isEmail(),
  
  body("password", "password must contain at least 5 characters")
    .trim()
    .isLength({min: 5})
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const encryptPW = await bcrypt.hash(req.body.password, 10)
    
    const user = new User({
      first_name: helper.capitalize(req.body.firstName),
      last_name: helper.capitalize(req.body.lastName),
      email: req.body.email,
      password: encryptPW
    })
  
    if(!errors.isEmpty()) {
      res.render("sign_up_form", {
        errors: errors.array(),
      });
      return;
    } else {
      const userExists = await User.findOne({ email: req.body.email})
        .collation({locale: "en", strength: 2})
        .exec();
      if(userExists) {
        res.redirect("/signup", {message: "existing email"})
      } else {
        console.log(user)
        await user.save()
        res.redirect("/", )
      }
    }
  })
]

exports.user_update_get = asyncHandler(async (req, res, next) => {
  const user = User.findById(req.params.id).exec()

  if(user === null) {
    res.redirect("/")
  }

  res.render("")
})

exports.user_update_post = asyncHandler(async (req, res, next) => {
  res.send('POST update')
})

exports.user_join_get = asyncHandler(async (req, res) => {
  res.render("membership", {
    user: req.user,
  })
})
exports.user_join_post = asyncHandler(async (req, res, next) => {
  const password = req.body.member
  if (password != process.env.secret) {
    const err = new Error("Incorrect Password")
    res.render('/join', {errMess: "Incorrect Password"})
  }
  else {
    const userId = (req.user._id).toString()
    const userExists = await User.findByIdAndUpdate(userId,{$set:{"isMember": true}}).exec()
    res.redirect('/')
    // if(userExists) {
    //   userExists.isMember = true;
    //   await userExists.save()
    //   res.redirect("/")
    // }
  }
})

exports.user_delete_get = asyncHandler(async (req, res, next) => {
  res.render('index', {title: "delete"})
})
exports.user_delete_post = asyncHandler(async (req, res, next) => {
  res.send('POST delete')
})


exports.user_login_get = asyncHandler(async (req, res, next) => {
  res.render("login")
})

exports.user_login_post =
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/log-in"
})

exports.user_logout_get = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/')
  })
})


