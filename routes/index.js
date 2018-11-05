var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get('/', (req, res) => res.render('landing'));

//show register form
router.get("/register", (req, res) => {
  res.render("register");
});

//sign up logic
router.post("/register", (req, res) => {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      return res.render("register")
    }
    passport.authenticate("local")(req, res, () => {
      res.redirect("/campgrounds");
    })
  });
})

//show login form
router.get("/login", (req, res) => {
  res.render("login")
})

//login logic
router.post("/login", passport.authenticate("local",
  {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), (req, res) => {
  })

//logout route
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/campgrounds");
})

//middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login")
  }
}

module.exports = router;