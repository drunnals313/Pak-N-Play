var passport = require('passport')
var LocalStrategy   = require('passport-local').Strategy;
var flash = require("connect-flash");
var crypto   = require('crypto');
var connection = require("../config/config.js");
var express = require("express");

var app = express();
var User = require("../models/users.js");

var session = require("express-session"),
    bodyParser = require("body-parser");

   
app.use(express.static("views"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// passport.use('local', new LocalStrategy({
//     usernameField: 'email',
//     passwordField: 'password',
//     passReqToCallback: true //passback entire req to call back
//   } , function (req, email, password, done){
//       console.log(JSON.stringify(req))
//         console.log(email+' = '+ password);
//         if(!email || !password ) { return done(null, false); }
//         var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
//         connection.query("select * from user_accounts where email = ?", [email], function(err, rows){
//             console.log(err);
//             console.log(rows)
//           if (err) return done(err);
  
//           if(!rows.length){ return done(null, false); }
//           console.log("entered password?")
//           salt = salt+''+password;
//           var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
          
//           var dbPassword  = rows[0].password;

//           console.log(encPassword)
//           console.log(dbPassword + "database pw")
          
//           if(!(dbPassword == encPassword)){
//             ("passwords aren't equal")
//               return done(null, false);
//            }
           
//            req.session.user = rows[0];
//            console.log(rows[0])
//           return done(null, rows[0]);
//         });
//       }
//   ));

passport.serializeUser(function(user, done){
  done(null, user.user_id);
console.log(user.user_id)
});

passport.deserializeUser(function(id, done){
  connection.query("select * from user_accounts where user_id = "+ id, function (err, user){
      done(err, user);
  });
});

  passport.use('local', new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      // passReqToCallback : true
    } , 
    function(email, password, done) {
      console.log(email)
      console.log(password)
      User.findUser(email, password, function(err, user, msgs) {
        console.log(user + "what happens to the user")
        console.log(msgs)
        if (err) { return done(err); }
        // console.log("no errors")
        // if (!user) {
        //   console.log("incorrect username")
        //   return done(null, false, { message: 'Incorrect username.' });
        // }
        // if (!user.password) {
        //   console.log("incorrect password")
        //   return done(null, false, { message: 'Incorrect password.' });
        // }
        // console.log(user)
        return done(null, user);
      });
    }
  ));

  app.get('/success', function(req, res){ 
    res.render("index")
  });


app.post('/login', passport.authenticate('local', {
  successRedirect: '/success',
  failureRedirect: '/',
  failureFlash: true }
// }, function(req, res) {
//   // If this function gets called, authentication was successful.
//   // `req.user` contains the authenticated user.
//   res.redirect('');
// }
))

app.post('/register', function(req, res) {
//   // If this function gets called, authentication was successful.
//   // `req.user` contains the authenticated user.
//   res.redirect('');\\

var firstName = req.body.first_name;
var lastName = req.body.last_name;
var password = req.body.password;
var address = req.body.address;
var city = req.body.city;
var state = req.body.state;
var email = req.body.email;

console.log(firstName + "Did we get a first name?")
console.log(password + "did we get a password")

var account = {
  "first_name": firstName,
  "last_name": lastName,
  "password": password,
  "street_address": address,
  "city": city,
  "state": state,
  "email": email
}

User.createAccount(account, function(err, account, msgs) {

if (err) throw(err); 
// // console.log("no errors")
// // if (!user) {
// //   console.log("incorrect username")
// //   return done(null, false, { message: 'Incorrect username.' });
// // }
// // if (!user.password) {
// //   console.log("incorrect password")
// //   return done(null, false, { message: 'Incorrect password.' });
// // }
// // console.log(user)
// return done(null, account);
// }
})
res.redirect("pages/additems.html")
});

app.get('/logout', function(req, res){
  req.session.destroy();
  req.logout();
  req.flash('success message', "You are now logged out")
  res.redirect('/');
});


module.exports = app;