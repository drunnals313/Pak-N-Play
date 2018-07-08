var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var path = require("path");
var exphnd = require("express-handlebars");

var app = express();

var PORT = process.env.PORT || 8080;

// app.use(express.static("public"));
//change views directory to public, and move CSS and other stuff to it. Compare to what's in public directory on cats activity

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.engine("handlebars", exphnd({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

var proutes = require("./controllers/passport.js");
require("./controllers/index.js")(app);
app.use(proutes);

app.listen(PORT, () => {
    console.log("App listening on PORT: localhost:" + PORT);
});

