const mongoose = require('mongoose');

// Define the schema
const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  first_name: { type: String, required: false },
  last_name: { type: String, required: false },
  email: { type: String, required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  password: { type: String, required: true },
  is_admin: { type: Boolean, default: false },
  userImage: { type: String, required: false }
}, { timestamps: true });

// Create the model
const User = mongoose.model('User', userSchema);

// Export the model
module.exports = User;
