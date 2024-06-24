const mongoose = require('mongoose');

// Define the schema
const projectSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  description: { type: String },
  created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  attachments: {type: Array, required: false }
}, { timestamps: true });

// Create the model
const Project = mongoose.model('Project', projectSchema);

// Export the model
module.exports = Project;
