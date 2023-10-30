module.exports.checkLoggedIn =  (req,res,next)=>{
  
     if(req.isAuthenticated()){
        
        next();
     }
     return res.redirect('/users/sign-in');

}

module.exports.checkLoggedOut = (req,res,next)=>{
    
    if(req.isAuthenticated()){
        return res.redirect('/users/');
     }
     next();
}


module.exports.setLoggedInUser = (req,res,next)=>{

     if(req.isAuthenticated()){
       res.locals.user = req.user;
      
     }

     return next();

}

module.exports.setFlash = (req,res,next)=>{
 
      res.locals.flash = {
          'success' : req.flash('success'),
          'error' : req.flash('error')
      }

      next()
      
}
