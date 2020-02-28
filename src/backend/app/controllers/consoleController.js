const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const cookieParser = require('cookie-parser');

const fireBaseMsg = require('./fireBaseSendMsg');

router.use( cookieParser() );

router.options( '/*', ( req, res, next ) => {
  res.header( 'Access-Control-Allow-Origin', '*' );
  res.header( 'Access-Control-Allow-Methods', 'GET, POST' );
  res.header( 'Access-Control-Allow-Headers', 'Accept, Access-Control-Allow-Origin, Content-Type' );
  res.sendStatus(204);
});

router.use( authMiddleware );

var resultResponse = {};
var validationResponse = {};
var statusResponse = {};


// Send data to Android Service
router.post('/', ( req, res, next ) => {

  const jsonData = JSON.parse( req.body.jsonData );
  const cookiesToken = req.headers.cookie;

  const token = cookiesToken.split('=')[1];
  
  const operacao = jsonData.operacao; 
  const dados = jsonData.dados; 

  const payload = {
    topic: "data",
    data: {
      operacao: operacao,
      dados: JSON.stringify( dados ), 
      token: token
    }  
  }

  console.log('data payload: ', payload);

  fireBaseMsg.sendData( payload ).then( (message) => {
    res.status(200).render( 'operacao', { 
      infoArea: 'Success message sent to the device '} );

  }).catch( (error) => { 
    console.log( 'Erro monstruoso: ', error );
    res.status(400).render( 'operacao', {
      infoArea: 'Erro, mensagem não enviada para o dispositivo'
    });
  });
});

router.get('/', ( req, res, next ) => {
  res.status(200).render( 'operacao', { infoArea:'' } );
});

// posted by Android Service - saves the data comming from the post to the response variable
// in order to use it on get request.
router.post('/resultado', ( req, res, next ) => {
  resultResponse = req.body;
  res.status(200).json( { ok: true } );
});

router.get('/resultado', ( req, res, next ) => {
  res.status(200).send( resultResponse );
  resultResponse = {};
});


router.post('/validacao', ( req, res, next ) => {
  validationResponse = req.body;
  res.status(200).json( { ok: true } );
});

router.get('/validacao', ( req, res, next ) => {
  res.status(200).send( validationResponse );
  validationResponse = {};

});

router.post('/status', ( req, res, next ) => {
  statusResponse = req.body;
  res.status(200).json( { ok: true } );
});

router.get('/status', ( req, res, next ) => {
  res.status(200).send( statusResponse );
  statusResponse = {};
});

module.exports = app => app.use( '/main/console', router );