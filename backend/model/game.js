var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the game schema.
var userSchema = new Schema({
  ip: String,
  name: String,
  price: Number
});

// Create the game model
var Game = mongoose.model('Game', userSchema);

module.exports = Game;