var path = require("path")
var express = require("express");
// var router = express.Router();
var paknplay = require("../models/inventory.js");

module.exports = function(app, jwt) {
app.get("/", function (req, res) {
    res.render("login");
    //res.sendFile(path.join(__dirname, "../views/pages/index.html"));
  });


app.get("/api/paknplay", function(req, res) {
  paknplay.all(function(data) {
    var invObject = {
      paknplays: data
    };
    console.log(invObject);
    res.render("index", invObject);
    //what does "index" refer to? edit this perhaps?
  });
});

app.post("/api/paknplay", function(req, res) {
  paknplay.create([
    "item name", "qty"
    //edit this so it coincides with SQL database fields
  ], [
    req.body.name, req.body.qty
    //edit this to coincide with SQL database columns
  ], function(result) {
    res.json({ id: result.insertId });
  });
});
}
