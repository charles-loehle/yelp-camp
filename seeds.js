var mongoose = require("mongoose");
var Campground = require('./models/campground');

function seedDB() {
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("removed Campgrounds");
  });
}

module.exports = seedDB;