const mongoose = require('../../database');

const ValidationSchema = new mongoose.Schema( {

  title: {
    type: String,
    require: true,
  },
  info: {
    type: String,
    require: true
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Validation = mongoose.model('Validation', ValidationSchema);

module.exports = Validation; 