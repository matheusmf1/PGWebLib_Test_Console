const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const fireBaseMsg = require('./fireBaseSendMsg');

router.use(authMiddleware);

router.options('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Accept, Access-Control-Allow-Origin, Content-Type');
  res.sendStatus(204);
});

// Memo: This file was created due to new functions implemented on Android, like setup by firebase 
// Therefore it's must be develop ASAP!!!

router.post('/', async (req, res) => {

  const payload = {
    topic: "wakeApp",
    notification: {},
    data: {
      title: "WakeApp",
      tcp_ip: "10.1.2.129",
      tcp_port: "6500",
      remote_port: "5558",
      server_host: "n0033-matheusfr",
      server_port: "3000"
    }
  }

  fireBaseMsg.sendData( payload ).then( (message) => {
    res.status(200).render(  );

  }).catch( (error) => { 
    console.log( 'Erro monstruoso: ', error );
    res.status(400).render();
  });

});


module.exports = app => app.use('/main/setup', router);