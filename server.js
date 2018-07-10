var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var path = require("path");
var exphnd = require("express-handlebars");
var app = express();
const jwt = require('jwt-express');


var PORT = process.env.PORT || 8080;

app.use(express.static("public"));
//change views directory to public, and move CSS and other stuff to it. Compare to what's in public directory on cats activity
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(jwt.init("WCFQC9PY8QAFVHUR6XZHG225ZGG5GFTJGILN", {
  cookies: false
}));

app.engine("handlebars", exphnd({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var proutes = require("./controllers/passport.js");
var routes = require("./controllers/itemsController.js");
require("./controllers/index.js")(app, jwt);


app.use(routes);
// require("./controllers/inventory.js");
app.use(proutes);

app.listen(PORT, () => {
    console.log("App listening on PORT: localhost:" + PORT);
});

