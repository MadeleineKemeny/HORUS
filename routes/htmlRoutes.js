var db = require("../models");
var path = require("path");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbUser
      });
    });
  });

  app.get("/userPage", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.render("userPage", {
        msg: "Welcome!",
        examples: dbUser
      });
    });
  });

    // Load example page and pass in an example by id
    app.get("/user/:id", function(req, res) {
      db.Example.findOne({ where: { id: req.params.id } }).then(function(dbUser) {
        res.render("index", {
          example: dbUser
        });
      });
    });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};

