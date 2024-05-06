var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the admin schema
var adminSchema = new Schema({
  name: String,
  pass: String
});

// Creating the model.
var Admin = mongoose.model('Adminstrate', adminSchema);

module.exports = Admin;