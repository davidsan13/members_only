const Message = require("../models/message")
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");

exports.index_get = asyncHandler(async (req, res, next) => {
  const messages = await Message.find()
  
  res.render('index', {
    title: 'Members Only', 
    user: req.user,
    messages: messages,
  })
})

// message_room controller

exports.message_get = asyncHandler(async (req, res, next) => {
  res.render('message_room')
})

exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render('message_form')
})

exports.message_create_post = [

  body("message", "Message must container at least 2 characters")
    .trim()
    .isLength({min: 2})
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    const reMessage = req.body.messageBtn
    console.log(reMessage)
    const message = new Message({
      text: req.body.message,
      user: req.user._id,
      name: req.user.first_name
    })

    if(!errors.isEmpty()) {
      res.render('index', {
        errors: errors.array(),
      });
      return;
    } else {
      await message.save()
      res.redirect("/")
    }
  res.render('POST create')
})
]
exports.message_delete_get = asyncHandler(async (req, res, next) => {
  res.render('GET delete')
})

exports.message_delete_post = asyncHandler(async (req, res, next) => {
  res.render('POST delete')
})

exports.message_update_get = asyncHandler(async (req, res, next) => {
  res.render('GET update')
})

exports.message_update_post = asyncHandler(async (req, res, next) => {
  res.render('POST update')
})

exports.message_room_post = [asyncHandler(async (req, res, next) => {
  res.render("message_room")
})
]

