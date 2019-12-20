const admin = require("firebase-admin");

const serviceAccount = require('../../../../pgweblib-auttest-firebase-adminsdk-hoorf-aa5f9c7409.json');
const registrationToken = "cOlR-tfRC7w:APA91bHYl_Z1OIEgpxfmQglvU9E4FA_b8AO5j-eSNCPfACyHg7HBAU4y1Opl6DLqybBeIXVfQXFqTxVlKfTdf-7ug_vpftGM4KUtjI37_UZqCd8DoskkVxiGEr48CN6Bc0CuZcYHW48j";

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
  console.log('Payload', payload)
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