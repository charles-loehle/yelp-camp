var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX - Show all the campgrounds 
router.get('/', (req, res) => {
  // Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

// CREATE - create a new campground
router.post('/', (req, res) => {
  // get data from form and add it to campgrounds array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc }
  // Create a new campground and save to DB
  Campground.create(newCampground, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

// NEW - Show form to add new campground
router.get("/new", (req, res) => {
  res.render("campgrounds/new.ejs");
});

// SHOW - Show a specific campground
router.get("/:id", (req, res) => {
  //find the campground with provided id
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render("campgrounds/show", { campground: foundCampground });
    }
  });
});

module.exports = router;