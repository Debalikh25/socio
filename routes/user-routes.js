const express = require('express');
const passport = require('passport');
const usersController = require('../controllers/users-controller')
const LocalPassportStrategy = require('../config/passport-local-config')
const middleware = require('../middlewares/middleware')
const Router = express.Router();


Router.get("/sign-in" , middleware.checkLoggedOut, usersController.signInPage)

Router.post("/sign-in" ,passport.authenticate('local' , {
    failureRedirect : '/users/sign-in'
}) , usersController.login)
 
Router.get("/sign-up" , middleware.checkLoggedOut ,  usersController.signUpPage)

Router.post("/sign-up" ,  middleware.checkLoggedOut ,  usersController.register)

Router.get("/"  ,  usersController.timeLine)

Router.get("/profile/:id" , usersController.profile)

Router.post("/update", usersController.updateProfile )

Router.get("/logout" , usersController.logout)


module.exports = Router