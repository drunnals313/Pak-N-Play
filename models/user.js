var connection = require("../config/config.js");
var passport = require('passport')
var LocalStrategy   = require('passport-local').Strategy;
var crypto   = require('crypto');


// var Strategy = passport.use('local', new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true //passback entire req to call back
// } , function (req, email, password, done){
//       console.log(email+' = '+ password);
//       if(!email || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
//       var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
//       connection.query("select * from user_accounts where email = ?", [email], function(err, rows){
//           console.log(err);
//         if (err) return done(req.flash('message',err));

//         if(!rows.length){ return done(null, false, req.flash('message','Invalid email or password.')); }
//         salt = salt+''+password;
//         var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
//         var dbPassword  = rows[0].password;
        
//         if(!(dbPassword == encPassword)){
//             return done(null, false, req.flash('message','Invalid email or password.'));
//          }
//          req.session.user = rows[0];
//         return done(null, rows[0]);
//       });
//     }
// ));

var Strategy = passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true //passback entire req to call back
} , 
  function(email, password, done) {
    connection.query("select * from user_accounts where email = ?", [email], function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

module.exports = Strategy;

