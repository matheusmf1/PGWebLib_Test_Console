const admin = require("firebase-admin");

const serviceAccount = require('../../../../pgweblib-auttest-firebase-adminsdk-hoorf-aa5f9c7409.json');

var exports = module.exports = {};

admin.initializeApp( {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pgweblib-auttest.firebaseio.com"
});


exports.sendData = ( payload ) => {
  
  return new Promise( ( resolve, reject ) => {
  
    admin.messaging().send( payload )
    .then( response => { 
      resolve( { Successfully: response } );
    })
    .catch( ( error ) => { 
      reject( { Error: error } );
    });
  });  
};
