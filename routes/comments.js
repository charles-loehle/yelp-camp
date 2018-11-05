var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment")

//==================
// COMMENTS ROUTES
//==================

router.get("/campgrounds/:id/comments/new", isLoggedIn, (req, res) => {
  // find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

router.post("/campgrounds/:id/comments", isLoggedIn, (req, res) => {
  //lookup campground using ID
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect("/campgrounds");
    } else {
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          campground.comments.push(comment);
          campground.save();
          res.redirect('/campgrounds/' + campground._id);
        }
      })
    }
  })
  //create new comment
  //connect new comment to campgrounds
  //redirect campground show page
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login")
  }
}

module.exports = router;