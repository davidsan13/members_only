const Message = require("../models/message")
const asyncHandler = require("express-async-handler")

// message_room controller

exports.message_room_get = asyncHandler(async (req, res, next) => {
  res.render('message_room')
})

exports.message_create_get = asyncHandler(async (req, res, next) => {
  res.send('GET create')
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

