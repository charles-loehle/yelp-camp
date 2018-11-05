var express = require("express");
var router = express.Router({ mergParams: true });
var Campground = require("../models/campground");
var Comment = require("../models/comment");

//Comments New
router.get("/new", isLoggedIn, (req, res) => {
  // find campground by id
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render("comments/new", { campground: campground });
    }
  });
});

//Comments Create
router.post("/", isLoggedIn, (req, res) => {
  //lookup campground using ID
  console.log(req.params.id);
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
});

//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login")
  }
}

module.exports = router;