const Message = require("../models/message")
const asyncHandler = require("express-async-handler")

exports.index_get = asyncHandler(async (req, res, next) => {
  const messages = await Message.find()
  const button = req.body
  // button.addEventListener('click', () => {
  //   console.log('Message Added')
  // })
  // console.log(button)
  // res.json({
  //   button: button,
  // })
  res.render('index', {
    title: 'Members Only', 
    user: req.user,
    messages: messages,
    button: button

  })
})

// message_room controller

exports.message_get = asyncHandler(async (req, res, next) => {
  res.render('message_room')
})

exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.render('message_form')
})

exports.message_create_post = asyncHandler(async (req, res, next) => {
  res.render('POST create')
})

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

