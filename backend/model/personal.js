var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the member save schema.
var userSchema = new Schema({
  name: String,
  price: Number
});

// Create the model for the personal member saves.
var Personal = mongoose.model('Personal', userSchema);

module.exports = Personal;