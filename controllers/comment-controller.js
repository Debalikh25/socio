const Comment  = require('../models/comment-model')
const Post = require('../models/post-model');
const User = require('../models/user-model');

//function to create a comment
module.exports.createComment = async (req,res)=>{


     try{
        if(!req.isAuthenticated()){
            return res.redirect('/users/sign-in')
        }

        const post  = await Post.findById(req.body.post);
        if(!post){
            req.flash('error' , 'Post Not Found !!')
            return res.redirect('back');
        }

        const newComment = await Comment.create({
            comment : req.body.comment,
            post : req.body.post,
            user : res.locals.user._id
        }) 

       post.comments.push(newComment._id);

       await post.save();
       req.flash('success' , 'Comment Added !!')
       return res.redirect('/users/');

    }catch(err){
        req.flash('error' , 'Some Error Occured !!')
         console.log(err);
         return res.redirect('/users/');
     }
}




//function to delete a comment
module.exports.deleteComment = async (req,res)=>{
       try{
        if(!req.isAuthenticated()){
            return res.redirect('/users/sign-in')
        }

         const comment = await Comment.findById(req.params.id);
         if(!comment){
            req.flash('error' , 'Comment Not Found !!')
            return res.redirect('back');
         }

         const post  = await Post.findById(comment.post);

         if(!post){
            req.flash('error' , 'Post Not Found !!')
            return res.redirect('back');
         }

         post.comments = post.comments.filter(cmt => cmt != comment.id);
       
         await post.save();

         await Comment.findByIdAndDelete(comment._id);
         req.flash('success' , 'Comment Deleted !!')
         return res.redirect('/users/');

       }
       catch(err){
        console.log(err);
        return res.redirect('/users/');
       }
}