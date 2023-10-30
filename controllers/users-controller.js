const User = require("../models/user-model");
const Post = require("../models/post-model");

//Function -> Renders sign-in page
module.exports.signInPage = (req, res) => {
  return res.render("sign-in", {
    title: "Login",
  });
};

//Function -> Passport middleware authenticates the user and redirect them to home
module.exports.login = (req, res) => {


  return res.redirect("/users/");
  
};

//Function -> Renders sign-up page
module.exports.signUpPage = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/users/");
  }
  return res.render("sign-up", {
    title: "Register",
  });
};



//Function -> Checks and Registers the User to the DB
module.exports.register = async (req, res) => {
  try {
    if (req.body.password != req.body.cpassword) {
      req.flash('error' , 'Password Not Matching !!')
      return res.redirect("back");
    }

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      req.flash('info' , 'User Exists !!')
      return res.redirect("back");
    }
    const newUser = new User(req.body);
    await newUser.save();
    req.flash('success' , 'Registration Success !!')
    return res.redirect("/users/");
  } catch (err) {
    req.flash('error' , 'Some Error Occured !!')
    console.log(`Error: ${err}`);
    return res.redirect("back");
  }
};



//Function -> Renders the timeline/home page after sign in
module.exports.timeLine = async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.redirect("/users/sign-in");
    }

    const posts = await Post.find({})
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });
    const users = await User.find({});

    return res.render("timeline", {
      title: "Timeline",
      user: req.session.passport.user,
      posts: posts,
      users: users,
    });
  } catch (err) {
    req.flash('error' , 'Some Error Occured !!')
    console.log(err);
    return res.redirect("/user/sign-in");
  }
};

//Function -> Renders the profile page of the signed in user
module.exports.profile = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/users/sign-in");
  }

  User.findById(req.params.id)
    .then((user) => {
      return res.render("Profile", {
        title: "Profile",
        profile: user,
      });
    })
    .catch((err) => {
      req.flash('error' , 'Some Error Occured !!')
      console.log(err);
      return res.redirect("/users/");
    });
};

//function to update the user's name and email
module.exports.updateProfile = (req, res) => {
    

    if(!req.isAuthenticated()){
        return res.redirect("/users/sign-in");
    }

      User.findByIdAndUpdate(req.body.id , req.body).then(user=>{
        req.flash('success' , 'Profile Updated !!')
        return res.redirect("/users");
      })
      .catch(err=>{
        console.log(err)
        return res.redirect("back");

      })
    }


//function to logout user and destroy session
module.exports.logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      req.flash('error' , 'Error Occured !!')
      return next(err);
    }
    req.flash('success' , 'Logged Out !!')
    res.redirect("/users/sign-in");
  });
};
