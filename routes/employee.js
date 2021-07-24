const express = require("express");
const router = express.Router();
var opts = { runValidators: true };
const passport = require("passport");

const employee = require("../models/employee");

// Checks if user is authenticated
function isAuthenticatedUser(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash("failure_msg", "Please Login first to access this page.");
  res.redirect("/");
}

//get routes starts here
router.get("/home", isAuthenticatedUser, (req, res) => {
  employee.find({}).then((employee) => {
    res.render("index", { employee: employee });
  });
});

// add employee
router.get("/home/new", isAuthenticatedUser, (req, res) => {
  res.render("new");
});

// search page
router.get("/home/search", isAuthenticatedUser, (req, res) => {
  res.render("search", { employee: "" });
});

//search employee
router.get("/home/searchemp", (req, res) => {
  let searchQuery = { name: { $regex: req.query.name, $options: "$i" } };

  if (req.query.name != "") {
    employee
      .find(searchQuery)
      .then((employee) => {
        res.render("search", { employee: employee });
      })
      .catch((err) => {
        // console.log(err);
      });
  } else res.render("search", { employee: "" });
});

// update page
router.get("/home/update:id", (req, res) => {
  let searchQuery = { _id: req.params.id };

  employee
    .findOne(searchQuery)
    .then((employee) => {
      res.render("update", { employee: employee });
    })
    .catch((err) => {
      // console.log(err);
    });
});

// post routes starts here
router.post("/home/new", (req, res) => {
  const newemployee = new employee(req.body);

  newemployee.save((err, newemployee) => {
    if (err) {
      // console.log(err);
      req.flash(
        "failure_msg",
        "All Fields are Required !!  Please Enter again"
      );
    } else req.flash("success_msg", "Employee data Added successfully !");

    res.redirect("/home/new");
  });
});

// put routes starts here

//update employee

router.put("/home/update:id", (req, res) => {
  let searchQuery = { _id: req.params.id };

  employee
    .updateOne(
      searchQuery,
      {
        $set: {
          name: req.body.name,
          position: req.body.position,
          contact: req.body.contact,
          joining_date: req.body.joining_date,
          salary: req.body.salary,
        },
      },
      opts
    )
    .then((employee) => {
      req.flash("success_msg", "Employee data Updated successfully !");

      res.redirect("/home");
    })
    .catch((err) => {
      //  console.log(err);

      req.flash(
        "failure_msg",
        "All Fields are Required !!  Please Enter again"
      );

      res.redirect(`/home/update${req.params.id}`);
    });
});

// delete route starts here

//delete employee data
router.delete("/home/delete:id", (req, res) => {
  let searchQuery = { _id: req.params.id };

  employee
    .deleteOne(searchQuery)
    .then((employee) => {
      req.flash("success_msg", "Employee data deleted successfully !");
      res.redirect("/home");
    })
    .catch((err) => {
      // console.log(err);
    });
});

module.exports = router;
