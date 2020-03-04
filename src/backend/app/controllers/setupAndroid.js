const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const fireBaseMsg = require('./fireBaseSendMsg');

const User = require('../models/user');
const Settings = require('../models/settings');

router.use(authMiddleware);

router.options('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST','UPDATE');
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
    res.status(200).render('settings');

  }).catch( (error) => { 
    console.log( 'Erro monstruoso: ', error );
    res.status(400).render('settings');
  });

});

router.get('/', async (req, res) => {
  res.status(200).render('settings');

});


router.post('/pinpad', async ( req, res ) => {
  try {
    
    const { tcpIp, tcpPort } = req.body;
    const title = 'wakeApp';
    var settings;

    const userSettings = await User.findByIdAndUpdate( req.userId ).select('settings').populate(['settings']); 
    const loadSettings = await Settings.findOne( { title: title, assignedTo: req.userId } );

    if ( loadSettings ) {

      await loadSettings.updateOne( { tcp_ip: tcpIp, tcp_port: tcpPort } );

      settings = await Settings.findOne( { title: title, assignedTo: req.userId } );  
      await userSettings.updateOne( { settings: settings } );
    }
    else {
      settings = await new Settings( { title: title, tcp_ip: tcpIp, tcp_port: tcpPort, assignedTo: req.userId } );
     
      settings.save();
      await userSettings.updateOne( { settings: settings } );
    }

    res.status(200).send({ settings: settings });

  } catch (error) {
    console.log('erro: ', error);
    res.status(400).send( { error: 'Error creating new Settings' } );
  }

});

router.post('/remote', async ( req, res ) => {
  try {
    
    const { remotePort } = req.body;
    const title = 'wakeApp';
    var settings;

    const userSettings = await User.findByIdAndUpdate( req.userId ).select('settings').populate(['settings']);
   
    const loadSettings = await Settings.findOne( { title: title, assignedTo: req.userId } );
   
    if ( loadSettings ) {

      await loadSettings.updateOne( { remote_port: remotePort } );
      settings = await Settings.findOne( { title: title, assignedTo: req.userId } );

      await userSettings.updateOne( { settings: settings } );
    }
    else {
      settings = await new Settings( { title: title, remote_port: remotePort, assignedTo: req.userId } );

      settings.save();
      await userSettings.updateOne( { settings: settings } );
    }

    res.status(200).send({ settings: settings });
    
  } catch (error) {
    console.log('erro: ', error);
    res.status(400).send( { error: 'Error creating new Settings' } );
  }
});

router.post('/server', async ( req, res ) => {
  try {
    
    const { serverHost, serverPort } = req.body;
    const title = 'wakeApp';
    var settings;

    const userSettings = await User.findByIdAndUpdate( req.userId ).select('settings').populate(['settings']);
    console.log('userSettings: ', userSettings);

    const loadSettings = await Settings.findOne( { title: title, assignedTo: req.userId } );
    console.log('oldData: ', loadSettings);

    if ( loadSettings ) {

      await loadSettings.updateOne( { server_host: serverHost, server_port: serverPort } );
      settings = await Settings.findOne( { title: title, assignedTo: req.userId } );

      console.log('newData: ', settings);
      await userSettings.updateOne( { settings: settings } );
    }
    else {
      settings = await new Settings( { title: title, server_host: serverHost, server_port: serverPort, assignedTo: req.userId } );
      console.log('New settings: ', settings);
      settings.save();
      await userSettings.updateOne( { settings: settings } );
    }

    res.status(200).send({ settings: settings });

  } catch (error) {
    console.log('erro: ', error);
    res.status(400).send( { error: 'Error creating new Settings' } );
  }

});

router.get('/pinpad', async ( req, res ) => {
  const title = 'wakeApp';
  const loadSettings = await Settings.findOne( { title: title, assignedTo: req.userId } ).select(['tcp_ip','tcp_port']);

  if ( loadSettings )
    res.status(200).send( { tcpData: loadSettings } )
  else
    res.status(404).send( { error: 'Tcp configuration not found' } );    
});

router.get('/remote', async ( req, res ) => {
  const title = 'wakeApp';
  const loadSettings = await Settings.findOne( { title: title, assignedTo: req.userId } ).select('remote_port');

  if ( loadSettings )
    res.status(200).send( { remoteData: loadSettings } )
  else
    res.status(404).send( { error: 'Remote Control configuration not found' } );    
});

router.get('/server', async ( req, res ) => {
  const title = 'wakeApp';
  const loadSettings = await Settings.findOne( { title: title, assignedTo: req.userId } ).select(['server_host','server_port']);

  if ( loadSettings )
    res.status(200).send( { serverData: loadSettings } )
  else
    res.status(404).send( { error: 'Server configuration not found' } );    
});

router.get('/load', async ( req, res ) => {
  const title = 'wakeApp';
  const loadSettings = await Settings.findOne( { title: title, assignedTo: req.userId } );
  
  if ( loadSettings )
    res.status(200).send( { loadSettings: loadSettings } )
  else
    res.status(404).send( { error: 'Tcp configuration not found' } );    
});


module.exports = app => app.use('/settings', router);