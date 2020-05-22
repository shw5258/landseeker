// var Comment = require("../models/comment");
var Commission = require("../models/commission");
module.exports = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
			console.log(`it is authenticated: ${req.isAuthenticated()}`)
            return next();
        }
        // req.flash("error", "You must be signed in to do that!");
        res.redirect("/enter");
    },
    checkUserCommission: function(req, res, next){
        if(req.isAuthenticated()){
            Commission.findById(req.params.id, function(err, campground){
               if(campground.author.id.equals(req.user._id)){
                   next();
               } else {
                   // req.flash("error", "You don't have permission to do that!");
                   // console.log("BADD!!!");
                   res.redirect("/commissions/" + req.params.id);
               }
            });
        } else {
            req.flash("error", "You need to be signed in to do that!");
            res.redirect("/enter");
        }
    },
    // checkUserComment: function(req, res, next){
    //     console.log("YOU MADE IT!");
    //     if(req.isAuthenticated()){
    //         Comment.findById(req.params.commentId, function(err, comment){
    //            if(comment.author.id.equals(req.user._id)){
    //                next();
    //            } else {
    //                req.flash("error", "You don't have permission to do that!");
    //                res.redirect("/commissions/" + req.params.id);
    //            }
    //         });
    //     } else {
    //         req.flash("error", "You need to be signed in to do that!");
    //         res.redirect("enter");
    //     }
    // }
}