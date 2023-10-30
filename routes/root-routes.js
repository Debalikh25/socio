const express = require('express')
const middleware = require("../middlewares/middleware")
const userRouter = require('./user-routes')
const postRouter  = require('./post-routes')
const commentRouter = require('./comment-routes')
const Router = express.Router()


Router.get("/" , middleware.checkLoggedOut, (req,res)=>{
    return res.redirect("/users/sign-in")
})

Router.use('/users' , userRouter)
Router.use('/post' , postRouter)
Router.use('/comment' ,commentRouter)



module.exports = Router