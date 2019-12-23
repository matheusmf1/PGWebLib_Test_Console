const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:mongo123@pgweblib-w0kkn.mongodb.net/PGWebLib_Console?retryWrites=true&w=majority', { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true 
}, ( error ) => { 
   if( error )
    console.log('Failed to connect to database');
   else
   console.log('DataBase Connected');
  });
mongoose.Promise = global.Promise;

module.exports = mongoose;

//cria a conexao do banco 