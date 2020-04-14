const admin = require("firebase-admin");

const serviceAccount = require('../../../../pgweblib-auttest-firebase-adminsdk-hoorf-aa5f9c7409.json');
// const registrationToken = "fpgWYMjSv_Q:APA91bFOlVEyYSNlF0pC7goOaQD4zSEuEj5OgUqf8G2J8aL54vO7Zv1hDyzCBc16inFXNQRVDufFaoGsqnAOysRNfLbSx-uvrpILvVs6-hLgqWNr8jnPTqTHrBqztnIV6Oj3GsvAryWi";
const registrationToken = "eGGSti5Wx-c:APA91bF9EXaHTfW9R35xJwwoTEAajJ_zZITfgG5WgzQytzCR2Lxs6Y-xmFsd8zfw5DoFwRMRxlqlvwdhJvIydvtINcUnAitNJ9qduGYOt6TadMDunnyhdHuf5ehbxznOq3VAPk_8Afpe";

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
