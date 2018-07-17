// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var User = {
  all: function(cb) {
    orm.all("user_accounts", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("user_accounts", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("user_accounts", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("user_accounts", condition, function(res) {
      cb(res);
    });
  },
  createAccount: function(account, cb) {
    console.log("What's in " + JSON.stringify(account))
    orm.createAccount("user_accounts", account, function(err, account, msgs) {
      return cb(null, account, msgs);
    })
  },
  findUser: function(email, password, cb) {
    orm.findByID("user_accounts", email, password, function(err, user, msgs) {
      return cb(null, user, msgs);
    })
  }
};

// Export the database functions for the controller (passport.js).
module.exports = User;
