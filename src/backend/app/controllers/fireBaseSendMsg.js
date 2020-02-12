const admin = require("firebase-admin");

const serviceAccount = require('../../../../pgweblib-auttest-firebase-adminsdk-hoorf-aa5f9c7409.json');
const registrationToken = "fpgWYMjSv_Q:APA91bFOlVEyYSNlF0pC7goOaQD4zSEuEj5OgUqf8G2J8aL54vO7Zv1hDyzCBc16inFXNQRVDufFaoGsqnAOysRNfLbSx-uvrpILvVs6-hLgqWNr8jnPTqTHrBqztnIV6Oj3GsvAryWi";

var exports = module.exports = {};

admin.initializeApp( {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pgweblib-auttest.firebaseio.com"
});

// define what will be delivered on the device
let setPayload = (op, info, cookie) => {
  info = JSON.stringify(info);
  var payload = {
    data: {
      operacao: op,
      dados: info, 
      token: cookie
    }  
  }
  console.log('Payload', payload);
  return payload;
};

//define some options when sending msg to the device
const options = {
  priority: "high",
  timeToLive: 60
};


exports.sendData = ( op, pl, cookie ) => {
  return new Promise( ( resolve, reject ) => {
    let payload = setPayload( op, pl, cookie );

    admin.messaging().sendToDevice( registrationToken, payload, options ).then( response => { 
      resolve( { Successfully: response } );
    }).catch( ( error ) => { 
      reject( { Error: error } );
    });
  });  
};