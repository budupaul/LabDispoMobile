// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var SongSchema   = new mongoose.Schema({
  title: String,
  artist: String,
  rating: Number
});

// Export the Mongoose model
module.exports = mongoose.model('Song', SongSchema);
