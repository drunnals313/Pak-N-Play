var path = require("path");

module.exports = function (app) {
  app.get("/", function (req, res) {
    // res.render('../public/html/index.html')
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });
};