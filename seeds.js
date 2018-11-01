var mongoose = require("mongoose");
var Campground = require('./models/campground');
var Comment = require("./models/comment");

var data = [
  {
    name: "Sunnyvale Camp",
    image: "https://images.unsplash.com/photo-1525811902-f2342640856e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1a7383ad093ffea99d373681b9974056&auto=format&fit=crop&w=800&q=60",
    description: "blah blah blah"
  },
  {
    name: "Cloud's Rest",
    image: "https://images.unsplash.com/photo-1526491109672-74740652b963?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=343c64df1b43f50769656d03c2b9f523&auto=format&fit=crop&w=800&q=60",
    description: "blah blah blah"
  },
  {
    name: "Desert Mesa",
    image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d95171e276fbd03de651f9aecb64b53d&auto=format&fit=crop&w=800&q=60",
    description: "blah blah blah"
  }
]

function seedDB() {
  //remove all campgrounds
  Campground.remove({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log("removed Campgrounds");
    // add a few campgrounds
    data.forEach((seed) => {
      Campground.create(seed, (err, campground) => {
        if (err) {
          console.log(err);
        } else {
          console.log("added a campground");
          //create a comment
          Comment.create(
            {
              text: "I wish there was internet",
              author: "Homer"
            }, (err, comment) => {
              if (err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log("Created new comment");
              }
            });
        }
      });
    });
  });
}

module.exports = seedDB;