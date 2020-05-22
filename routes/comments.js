const express = require("express"),
	  router  = express.Router({mergeParams: true}),
	  Commission = require("../models/commission"),
	  Comment = require("../models/comment"),
	  middleware = require("../middleware")

router.get("/new", middleware.isLoggedIn, function(req, res){
	// res.send("새로운 댓글")
    Commission.findById(req.params.id, function(err, commission){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {commission: commission});
        }
    })
})

router.post("/", middleware.isLoggedIn, function(req, res){
	Commission.findById(req.params.id, function(err, commission){
        if(err){
            console.log(err)
			res.redirect("/commissions")
        } else {
             Comment.create(req.body.comment, (err, comment) =>{
				 if(err){
					 console.log(err)
				 }else{
					 commission.comments.push(comment)
					 commission.save()
					 res.redirect("/commissions/" + commission._id)
				 }
			 })
        }
    })
})
	  
module.exports = router