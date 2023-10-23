const bcrypt = require("bcryptjs");
const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");

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
        res.redirect("/sign-up", {message: "existing email"})
      } else {
        console.log(user)
        await user.save()
        res.redirect("/")
      }
    }
  })
]
