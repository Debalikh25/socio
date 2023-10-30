const passport  = require('passport');
const User = require('../models/user-model')
const LocalStrategy = require('passport-local').Strategy


passport.use(new LocalStrategy({
    
    usernameField  : 'email',
    passReqToCallback : true

} , async (req , username , password , done)=>{
  
    try{
      
        const user   = await User.findOne({email : username})
        if(!user){
            req.flash('error', 'User not found')
            return done(null, false, {message : 'User Not Found !'})
        }

        if(user.password != password) {
            req.flash('error', 'Password is incorrect')
            return done(null ,false , {message : 'Password is Incorrect !'})
    }

   
   
    return done(null , user , {message : 'Sign In Successfull'})

}
    catch(err){
        req.flash('error', 'Something went Wrong')
       return  done(err)
    }
}));


passport.serializeUser((user, done)=>{
   return  done(null, user)
})


passport.deserializeUser( async (user, done)=>{
  
     try{
        
       const user1 =  await User.findById(user._id)

       if(!user1){
        return done(null, false, {message : 'User Not Found!'})
       }
       
       return done(null, user1)
    }

     catch(err){
        return done(err)
     }

});



module.exports = passport