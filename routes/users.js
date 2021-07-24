const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/usermodel");

//Get routes
router.get("/", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "You have been logged out.");
  res.redirect("/");
});

//POST routes
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/",
    failureFlash: "Invalid email or password. Try Again!!!",
  })
);

router.post("/signup", (req, res) => {
  let { name, email, password } = req.body;

  let userData = {
    name: name,
    email: email,
  };

  User.register(userData, password, (err, user) => {
    if (err) {
      req.flash("error_msg", "ERROR: " + err);
      res.redirect("/signup");
    }
    passport.authenticate("local")(req, res, () => {
      req.flash("success_msg", "Account created successfully");
      res.redirect("/");
    });
  });
});

module.exports = router;
