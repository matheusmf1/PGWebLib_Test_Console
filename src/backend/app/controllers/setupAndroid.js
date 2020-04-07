const router = require('express').Router();
const authMiddleware = require('../middlewares/auth');
const fireBaseMsg = require('./fireBaseSendMsg');

const User = require('../models/user');
const Settings = require('../models/settings');

var setupOk = {};

router.use(authMiddleware);

router.options('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST','UPDATE');
  res.header('Access-Control-Allow-Headers', 'Accept, Access-Control-Allow-Origin, Content-Type');
  res.sendStatus(204);
});


router.post('/', async (req, res) => {

  const loadSettings = await Settings.findOne( { title: 'wakeApp', assignedTo: req.userId } );
  let payload = {};

  const cookiesToken = req.headers.cookie;
  const token = cookiesToken.split('=')[1];

  if ( loadSettings ) {
    payload = {
      topic: "wakeApp",
      notification: {},
      data: {
        title: "WakeApp",
        tcp_ip: loadSettings.tcp_ip,
        tcp_port: loadSettings.tcp_port,
        remote_port: loadSettings.remote_port,
        server_host: loadSettings.server_host,
        server_port: loadSettings.server_port,
        token: token
      }
    }

  } else {
    // criar função para configurar a aplicação  pela primeira vez   
 
  }


  fireBaseMsg.sendData( payload ).then( (message) => {
    res.status(200).render('settings', {  data: payload.data });

  }).catch( (error) => { 
    console.log( 'Erro monstruoso: ', error );
    res.status(400).render('settings');
  });

});

router.get('/', async (req, res) => {

  const loadSettings = await Settings.findOne( { title: 'wakeApp', assignedTo: req.userId } );
  
  let data = {};

  if ( loadSettings ) {
    data = {
      tcpIp: loadSettings.tcp_ip,
      tcpPort: loadSettings.tcp_port,
      remotePort: loadSettings.remote_port,
      serverHost: loadSettings.server_host,
      serverPort: loadSettings.server_port
    }
  } else 
    data = { tcpIp:'', tcpPort: '', remotePort: '', serverHost: '', serverPort: '' }

  res.status(200).render('settings', {
    data: data
  });

});

router.get('/json', async ( req, res ) => {
  const title = 'wakeApp';
  const loadSettings = await Settings.findOne( { title: title, assignedTo: req.userId } );
  
  if ( loadSettings )
    res.status(200).send( { loadSettings: loadSettings } )
  else
    res.status(404).send( { error: 'Tcp configuration not found' } );    
});

router.post('/pinpad', async ( req, res ) => {
  try {
    
    const { tcpIp, tcpPort } = req.body;
    const title = 'wakeApp';
    var settings;

    const userSettings = await User.findByIdAndUpdate( req.userId ).select('settings').populate( 'settings' ); 
    let loadSettings = await Settings.findOne( { title: title, assignedTo: req.userId } );

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

    loadSettings = await Settings.findOne( { title: 'wakeApp', assignedTo: req.userId } );
  
    let data = {};
  
    if ( loadSettings ) {
      data = {
        tcpIp: loadSettings.tcp_ip,
        tcpPort: loadSettings.tcp_port,
        remotePort: loadSettings.remote_port,
        serverHost: loadSettings.server_host,
        serverPort: loadSettings.server_port
      }
    } else 
      data = { tcpIp:'', tcpPort: '', remotePort: '', serverHost: '', serverPort: '' }


    res.status(200).render('settings', {
      data: data
    });
    

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
   
    let loadSettings = await Settings.findOne( { title: title, assignedTo: req.userId } );
   
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

    loadSettings = await Settings.findOne( { title: 'wakeApp', assignedTo: req.userId } );
  
    let data = {};
  
    if ( loadSettings ) {
      data = {
        tcpIp: loadSettings.tcp_ip,
        tcpPort: loadSettings.tcp_port,
        remotePort: loadSettings.remote_port,
        serverHost: loadSettings.server_host,
        serverPort: loadSettings.server_port
      }
    } else 
      data = { tcpIp:'', tcpPort: '', remotePort: '', serverHost: '', serverPort: '' }


    res.status(200).render('settings', {
      data: data
    });

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

    let loadSettings = await Settings.findOne( { title: title, assignedTo: req.userId } );
    console.log('oldData: ', loadSettings);

    if ( loadSettings ) {

      await loadSettings.updateOne( { server_host: serverHost, server_port: serverPort } );
      settings = await Settings.findOne( { title: title, assignedTo: req.userId } );
      
      await userSettings.updateOne( { settings: settings } );
    }
    else {
      settings = await new Settings( { title: title, server_host: serverHost, server_port: serverPort, assignedTo: req.userId } );
      console.log('New settings: ', settings);
      settings.save();
      await userSettings.updateOne( { settings: settings } );
    }


    loadSettings = await Settings.findOne( { title: 'wakeApp', assignedTo: req.userId } );
  
    let data = {};
  
    if ( loadSettings ) {
      data = {
        tcpIp: loadSettings.tcp_ip,
        tcpPort: loadSettings.tcp_port,
        remotePort: loadSettings.remote_port,
        serverHost: loadSettings.server_host,
        serverPort: loadSettings.server_port
      }
    } else 
      data = { tcpIp:'', tcpPort: '', remotePort: '', serverHost: '', serverPort: '' }


    res.status(200).render('settings', {
      data: data
    });

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

router.post('/setup', ( req, res ) => {
  setupOk = req.body;
  res.status(200).send( { ok: true } );
});

router.get('/setup', ( req, res ) => {
  res.status(200).send( setupOk );
  setupOk = {};
});


router.post('/close', async ( req, res ) => {

  const payload = {
     topic: "/topics/turnOff",
     notification: {},
     data: { title: "turnOff" }
   }
 
   fireBaseMsg.sendData( payload ).then( (message) => {
     res.status(200).json( { ok:true });
 
   }).catch( (error) => { 
     console.log( 'Erro monstruoso: ', error );
   });
 
 });
 

module.exports = app => app.use('/settings', router);