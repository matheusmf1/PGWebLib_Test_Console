const mongoose = require('../../database');

const SettingsSchema = new mongoose.Schema( {

  title: {
    type: String,
    require
  },
  tcp_ip: {
    type: String
  },
  tcp_port: {
    type: String
  },
  remote_port: {
    type: String
  },
  server_host: {
    type: String
  },
  server_port: {
    type: String
  },
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

const Settings = mongoose.model('Settings', SettingsSchema);

module.exports = Settings; 