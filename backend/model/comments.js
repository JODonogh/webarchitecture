var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the comment schema.
var userSchema = new Schema({
  name: String,
  email: String,
  phone: Number,
  comment: String
});

// Create a comment model.
var Comment = mongoose.model('Comment', userSchema);

module.exports = Comment;