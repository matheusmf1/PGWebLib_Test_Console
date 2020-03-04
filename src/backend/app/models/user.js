const mongoose = require('../../database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema( {

  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    require: true,
    select: false
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  settings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Settings'
  },
  passwordResetToken: {
    type: String,
    select: false
  },
  passwordResetExpires: {
    type: Date,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//Encriptar senha -- o this faz referencia ao objeto UserSchema

UserSchema.pre('save', async function( next )  {  
  
  const hash = await bcrypt.hash( this.password, 10 );
  this.password = hash;

  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User; 