// Load required packages
var Song = require('../models/song');

// Create endpoint /api/songs for POSTS
exports.postSongs = function(req, res) {
  // Create a new instance of the Song model
  var song = new Song();

  // Set the song properties that came from the POST data
  song.title = req.body.title;
  song.artist = req.body.artist;
  song.rating = req.body.rating;

  // Save the song and check for errors
  song.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Song added to the locker!', data: song });
  });
};

// Create endpoint /api/songs for GET
exports.getSongs = function(req, res) {
  // Use the Song model to find all song
  Song.find(function(err, songs) {
    if (err)
      res.send(err);

    res.json(songs);
  });
};

// Create endpoint /api/songs/:song_id for GET
exports.getSong = function(req, res) {
  // Use the Song model to find a specific song
  Song.findById(req.params.song_id, function(err, song) {
    if (err)
      res.send(err);

    res.json(song);
  });
};

// Create endpoint /api/songs/:song_id for PUT
exports.putSong = function(req, res) {
  // Use the Song model to find a specific song
  Song.findById(req.params.song_id, function(err, song) {
    if (err)
      res.send(err);

	console.log(req.body.title);
    // Update the existing song quantity
    if (req.body.title != undefined && req.body.title != ''){
		song.title = req.body.title;
	}
	if (req.body.artist != undefined && req.body.artist != ''){
		song.artist = req.body.artist;
	}

    // Save the song and check for errors
    song.save(function(err) {
      if (err)
        res.send(err);

      res.json(song);
    });
  });
};

// Create endpoint /api/songs/:song_id for DELETE
exports.deleteSong = function(req, res) {
  // Use the Song model to find a specific song and remove it
  Song.findByIdAndRemove(req.params.song_id, function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Song removed from the locker!' });
  });
};
