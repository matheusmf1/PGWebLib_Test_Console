const mongoose = require('../../database');

const ProjectSchema = new mongoose.Schema( {

  title: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  validations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Validation'
  }],
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project; 