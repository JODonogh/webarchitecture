var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define a user schema.
var userSchema = new Schema({
  name: String,
  pass: String
});

// Create a model.
var User = mongoose.model('User', userSchema);

module.exports = User;