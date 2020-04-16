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
      return res.status(400).render( 'login', { type: 'alert__container--warning', info: 'Usuário já existe!' } );
     
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
    return res.status(400).render( 'login', { type: 'alert__container--error', info: 'Desculpe, erro ao cadastrar o usuário!' } );
  }

});


router.post('/authenticate', async ( req, res ) => {

  const { email, password } = req.body;

  const user = await User.findOne( { email } ).select('+password');

  if ( !user )
    return res.status(404).render( 'login', {  type: 'alert__container--warning', info: 'Desculpe, usuário não encontrado!' } );
  
  if ( !await bcrypt.compare( password, user.password ) )
    return res.status(400).render( 'login', {  type: 'alert__container--error', info: 'Senha Incorreta, por favor tente novamente!' } );
  
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
  const ip = req.connection.remoteAddress;
  const port = process.env.PORT;
  
  const ipAdd = `${ip}:${port}`;

  try {
    
    const user = await User.findOne( { email } );

    if( !user )
      return res.status(404).render( 'login', { type: 'alert__container--warning', info: 'Desculpe, usuário não encontrado!' } );

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

    const url = `http://${ipAdd}/auth/reset_password/${token}`;

    mailer.sendMail( {
      to: email,
      from: 'matheus.franco@test.com.br',
      html: `
      <p>Você esqueceu sua senha? Não se preocupe, click nesse <a href="${url}">link</a> to para alterar a senha </p> `

    }, ( err ) => {
      if( err )
        return res.status(400).render( 'login', { type: 'alert__container--error', info: 'Descuple, não foi possivel enviar o email, por favor tente novamente!' } );

      return res.status(200).render( 'login', { type: 'alert__container--success', info: 'Um link para recuperar sua senha foi enviado para seu email!' } );
     });

  } catch (err) {
    console.log(err);
    return res.status(400).render( 'login', { type: 'alert__container--error', info: 'Descuple, não foi possivel enviar o email, por favor tente novamente!' } );
  }
});


router.post('/reset_password/:token', async ( req, res ) => {

  const { email, password } = req.body;
  const token = req.params.token;

  try {

    const user = await User.findOne( { email } )
    .select('+passwordResetToken passwordResetExpires');

    if( !user )
      return res.status(404).render('passwordReset', { type: 'alert__container--warning', info: 'Usuário não encontrado', token: token });

    if( token !== user.passwordResetToken )
      return res.status(401).render('passwordReset', { type: 'alert__container--warning', info: 'Token inválido', token: token })

    const now = new Date();

    if( now > user.passwordResetExpires )
      return res.status(404).render('passwordReset', { type: 'alert__container--warning', info: 'Link expirado, gere um novo', token: token })


    user.password = password;

    user.save();
  
    return res.status(200).render( 'passwordReset', { type: 'alert__container--success', info: 'Senha alterada com sucesso!', token: token } );
    
  } catch (error) {
      return res.status(400).render('passwordReset', { type: 'alert__container--warning', info: 'Desculpe, houve um erro ao alterar a senha, por favor tente novamente', token: token });
}
});

router.get('/reset_password/:token', ( req, res, next ) => {

  const token = req.params.token;

  res.status(200).render('passwordReset', { type: '', info: '', token: token } );

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