var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000, // npm run server
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds");

mongoose.connect("mongodb://localhost:27017/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
seedDB();

app.get('/', (req, res) => res.render('landing'));

// Index - Show all the campgrounds 
app.get('/campgrounds', (req, res) => {
  // Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

// Create - create a new campground
app.post('/campgrounds', (req, res) => {
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

// New - Show form to add new campground
app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
});

// Show - Show a specific campground
app.get("/campgrounds/:id", (req, res) => {
  //find the campground with provided id
  Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
    if (err) {
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render("show", { campground: foundCampground });
    }
  });
});

app.listen(port, () => {
  console.log("YelpCamp Server has started on port 3000!");
});

