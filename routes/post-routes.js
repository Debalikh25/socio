const postController = require('../controllers/post-controller')
const express = require('express');
const Router = express.Router();


Router.post('/create' , postController.createPost)

Router.get("/delete/:id" , postController.deletePost)

module.exports = Router;