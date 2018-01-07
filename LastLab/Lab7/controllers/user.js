// Load required packages
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

// Create endpoint /api/users for POST
exports.postUsers = function(req, res) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
	role: 'Client'
  });

  user.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'New user added to the locker room!' });
  });
};

// Create endpoint /api/users for GET
exports.getUsers = function(req, res) {
  User.find(function(err, users) {
    if (err)
      res.send(err);

    res.json(users);
  });
};

// Create endpoint /api/user for GET
exports.getUser = function(req, res) {
  try{
	console.log(req.body.username);
	console.log(req.body.password);
	User.find({ username: req.body.username }, function (err, user) {
      if (err) { res.send(err); return; }
	  if (user.length === 0) { res.send('NoUser'); return;}

      // Make sure the password is correct
      verifyPass(req.body.password, user[0].password, function(err, isMatch) {
        if (err) { res.send(err); }

        // Password did not match
        if (!isMatch) { res.send('NoUser'); }

        // Success
        res.send(user[0].role);
      });
    });
  }
  catch(e){
	  res.send('NoUser');
  }
};

// Create endpoint /api/songs/:song_id for DELETE
exports.deleteUser = function(req, res) {
  // Use the Song model to find a specific song and remove it
  User.findByIdAndRemove(req.params.user_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Song removed from the locker!' });
  });
};
function verifyPass(password1, password2, cb) {
console.log(password1);
console.log(password2);

  bcrypt.compare(password1, password2, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};