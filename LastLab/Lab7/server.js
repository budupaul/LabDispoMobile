// Load required packages
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var songController = require('./controllers/song');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');


// Connect to the songlocker MongoDB
mongoose.connect('mongodb://localhost:27017/songlocker');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

//Use the passport package
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(userController.getUsers);
 
router.route('/users/:user_id')
  .delete(userController.deleteUser);
  
router.route('/user')
  .post(userController.getUser);

// Create endpoint handlers for /songs
router.route('/songs')
  .post(songController.postSongs)
  .get(songController.getSongs);

// Create endpoint handlers for /songs/:song_id
router.route('/songs/:song_id')
  .get(authController.isAuthenticated.authenticate('basic', { session: false }),songController.getSong)
  .put(songController.putSong)
  .delete(songController.deleteSong);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);
