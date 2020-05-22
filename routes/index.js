const express = require("express"),
	  router  = express.Router(),
	  passport = require("passport"),
	  User = require("../models/user")

router.get('/', (req, res) => {
	console.log(req.session)
	res.redirect('/commissions')
})

router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            // req.body.flash("error", err.message)
            return res.render("register")
        }
        passport.authenticate("local")(req, res, function(){
           // req.body.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username)
           res.redirect("./commissions") 
        })
    })
})

//입장하기화면
router.get("/enter", function(req, res){
   res.render("enter"); 
})

//입장과정진행
router.post("/enter", passport.authenticate("local", 
    {
        successRedirect: "/commissions",
        failureRedirect: "/enter"
    }), function(req, res){
});

// logout route
router.get("/out", function(req, res){
   req.logout();
   // req.flash("success", "퇴장하였습니다!");
   res.redirect("/commissions");
});

module.exports = router