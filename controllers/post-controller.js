const Post  = require('../models/post-model')
const Comment = require('../models/comment-model')

//function creates a post
module.exports.createPost = async (req,res)=>{
      
    try{
        if(req.isAuthenticated()){
            req.body.user = res.locals.user._id
            const post  = new Post(req.body)
             const newPost  =  await post.save();
            const createdPost  =  await Post.findById(newPost._id)
             .populate("user")
             .populate({
               path: "comments",
               populate: {
                 path: "user",
               },
             });

           

             if(req.xhr){
              return res.status(200).json({
                 data : createdPost
              })
             }
            return res.redirect("back")
        }
       
        return res.redirect("/users/sign-in")
    }
    catch(err){
      req.flash('error' , 'Some Error Occured !!')
         console.log(err)
         if(req.xhr){
          return res.status(500).json({
            error : err
          })
         }
         return res.redirect("/users/sign-in");
    }

}



//function deletes a post
module.exports.deletePost  = async (req,res)=>{

        
     try{

        if(!req.isAuthenticated()){
            return res.redirect("/users/sign-in");

        }
          const post  = await Post.findById(req.params.id);
          if(!post){
            req.flash('error' , 'Post Not Found !!')
            return res.redirect("/users");
          }
      
        await Comment.deleteMany({post : req.params.id})

        await Post.findByIdAndDelete(req.params.id)
        req.flash('success' , 'Post Deleted !!')
        return res.redirect("/users/");
     }
     catch(err){
      req.flash('error' , 'Some Error Occured !!')
       console.log(err)
       return res.redirect("/users/");
     }

}