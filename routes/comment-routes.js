const commentController = require('../controllers/comment-controller')
const express = require('express');
const Router = express.Router();


Router.post('/create' , commentController.createComment)
Router.get('/delete/:id' , commentController.deleteComment)


module.exports = Router;