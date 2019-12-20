const fs = require('fs');
const path = require('path');

module.exports = app => {
//importa todos os controllers sem ser os de configuracao 
  fs.readdirSync(__dirname).filter( file => ( 
      ( file.indexOf('.') !== 0 && ( file !== 'index.js' ) && ( file !== 'fireBaseSendMsg.js' ) )))
      .forEach( file => require( path.resolve(__dirname, file) )(app));
};