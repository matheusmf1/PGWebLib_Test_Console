const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const mailer = require('../../modules/mailer');

const authConfig = require('../../config/auth.json');

const Project = require('../models/project');
const Validation = require('../models/validation');
const User = require('../models/user');
const Settings = require('../models/settings');

const router = express.Router();

router.options( '/*', ( req, res, next ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Methods', 'GET, POST, DELETE' );
  res.header( 'Access-Control-Allow-Headers', 'Accept, Access-Control-Allow-Origin, Content-Type' );
  res.sendStatus(204);
});

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
    console.log('token: ', token);
    return res.cookie('tokenkey', token, {
      maxAge: 3600000, // 1 hour
      httpOnly: true
    }).redirect('/settings');

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
  console.log('token: ', token);
  res.cookie('tokenkey', token, {
    maxAge: 3600000, // 1 hour
    httpOnly: true
  }).redirect('/main');
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

router.get('/logout', ( req, res, next ) => {
  res.clearCookie('tokenkey').redirect('/');
});

router.get('/user', async ( req, res ) => {
  try{
    const users = await User.find().populate( ['projects'] );
    return res.status(200).send( { users } );

  } catch( err ) {
    console.log( err );
    return res.status(400).send( { error: 'Error on  finding users' } );
  }
});

router.get('/user/:email', async ( req, res ) => {
  try {
    const user = await User.find( { email: req.params.email } ).populate( ['projects, tasks'] );

    if ( !user )
      return res.status(404).send( { error: 'User not found' } );

      const token = generateToken( { id: user.id } );
      res.header('auth-token', token).send( { user } );
  } catch( err ) {
    console.log( err );
    res.status(400).send( { error: 'Error on loading user' } )
  }

});

router.delete('/user/:email', async (req, res) => {
  try {
    
    const user = await User.findOne( { email: req.params.email } ).populate( 'projects' );

    if ( !user )
      return res.status(404).send( { error: 'User not found'} );

    if ( user.projects.length > 0 ) {

      user.projects.forEach( async ( project ) => {
        console.log('project ', project);
     
        const validations = project.validations;

        if ( validations )
          validations.forEach( async ( v ) => { await Validation.findByIdAndDelete( v ); } );  

        await Project.findByIdAndDelete( project._id );
      });
    }

    if ( user.settings )
      await Settings.findByIdAndDelete( user.settings );

    await User.findByIdAndDelete( user._id );

    res.status(200).send( {  ok: true } );

  } catch (error) {
    console.log(error);
    res.status(400).send( {  ok: false } );

  }
  

});


module.exports = ( app ) => app.use( '/auth', router );