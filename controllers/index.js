var express = require("express");

var router = express.Router();

var paknplay = require("..views/js/inventory.js");

router.get("/", function(req, res) {
  paknplay.all(function(data) {
    var invObject = {
      paknplays: data
    };
    console.log(invObject);
    res.render("index", invObject);
    //what does "index" refer to? edit this perhaps?
  });
});

router.post("/api/paknplay", function(req, res) {
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

module.exports = router;