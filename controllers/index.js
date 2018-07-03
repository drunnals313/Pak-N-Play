module.exports = function (app) {
  app.get("/", function (req, res) {
    res.render('index')
    // res.sendFile(path.join(__dirname, "../views/index.html"));
  });
};