const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth.json');

const User = require('../models/user');

const router = express.Router();

const generateToken = ( params = {} ) => { 
  return jwt.sign( params, authConfig.secret, { expiresIn: 3600 } ); // 1 hour
};

router.post('/register', async ( req, res ) => {
  const { email } = req.body;

  try {

    if ( await User.findOne( { email } ) )
      return res.status(400).send( { error: 'User Already Exists' } );

    const user = await User.create( req.body );

    //para não retornar a senha no json
    user.password = undefined;
    const token = generateToken( { id: user.id } );

    return res.cookie('tokenkey', token, {
      maxAge: 3600000, // 1 hour
      httpOnly: true
    }).redirect('/operacao');

  } catch( err ) {
    return res.status(400).send( { error: 'Registration Failed' } );
  }

});


router.post('/authenticate', async ( req, res ) => {

  const { email, password } = req.body;

  const user = await User.findOne( { email } ).select('+password');

  if(!user)
    return res.status(404).send( { error: 'User Not Found' } );

  if( !await bcrypt.compare( password, user.password ) )
    return res.status(400).send( { error: 'Invalid Password' } );

  user.password = undefined;
  const token = generateToken( { id: user.id } );

  res.cookie('tokenkey', token, {
    maxAge: 3600000, // 1 hour
    httpOnly: true
  }).redirect('/operacao');
});


router.post('/forgot_password', async ( req, res ) => {
  const { email } = req.body;

  try {
    
    const user = await User.findOne( { email } );

    if( !user )
      return  res.status(400).send( { error: 'User not found' } );

    const token = crypto.randomBytes(20).toString('hex');

    //tempo para o token ser valido
    const now = new Date();
    now.setHours( now.getHours() + 1 );

    await User.findByIdAndUpdate( user.id, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now
      }
    });

    mailer.sendMail( {
      to: email,
      from: 'matheus.franco@test.com.br',
      html: `
      <p>Você esqueceu sua senha? Não se preocupe, utilize esse token: { ${ token } } </p> `

    }, ( err ) => {
      if( err )
        return res.status(400).send( { error: 'Cannot send forgot password email' } );

  
      return res.status(200).send( { ok: true } );
     });

  } catch (err) {
    console.log(err);
    res.status(400).send( { error: 'Error on forgot password, try again' } );
  }
});


router.post('/reset_password', async ( req, res ) => {

  const { email, token, password } = req.body;

  try {

    const user = await User.findOne( { email } )
    .select('+passwordResetToken passwordResetExpires');

    if( !user )
      return res.status(404).send( { error: 'User not found' } );

    if( token !== user.passwordResetToken )
      return res.status(400).send( { error: 'Token invalid' } );

    const now = new Date();

    if( now > user.passwordResetExpires )
      return res.status(400).send( { error: 'Token has expired, generate a new one' } );

    user.password = password;

    user.save();
  
    res.status(200).send( { ok: true } );
    
  } catch (error) {
    res.status(400).send( { error: 'Cannot reset password, try it again' } )
  }
});

module.exports = ( app ) => app.use( '/auth', router );