const mongoose = require('../../database');

const ScriptSchema = new mongoose.Schema( {

  title: {
    type: String,
    require: true,
  },
  content: {
    type: JSON,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Script = mongoose.model('Scripts', ScriptSchema);

module.exports = Script; 