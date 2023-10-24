const bcrypt = require("bcryptjs");
const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ email: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      };
      const match = await bcrypt.compare(password, user.password)
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      };
      return done(null, user);
    } catch(err) {
      return done(err);
    };
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});

// user controller
exports.user_create_get = asyncHandler(async (req, res, next) => {
  res.render("sign_up_form")
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
      first_name: req.body.firstName,
      last_name: req.body.lastName,
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
        res.redirect("/", {message: "existing email"})
      } else {
        console.log(user)
        // await user.save()
        res.redirect("/")
      }
    }
  })
]

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

// message_room controller

exports.message_room_get = asyncHandler(async (req, res, next) => {
  res.render('message_room')
})

exports.message_room_post = [asyncHandler(async (req, res, next) => {
  res.render("message_room")
})
]