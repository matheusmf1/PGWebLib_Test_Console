const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const port = process.env.PORT;

app.use( bodyParser.urlencoded( { extended: false } ) );
app.use( bodyParser.json() );

app.set( 'views', path.join( __dirname, 'src/frontend/views' ) );
app.use( express.static( path.join( __dirname, 'public' ) ) );

app.set( 'view engine', 'ejs' );

require('./src/backend/app/controllers/index')(app);

app.get('/', ( req, res, next ) => {
  res.status(200).render( 'home' );
});

app.listen( port, ( err ) => {
  if ( err ) {
    console.error( err );
  } else {
    console.log( `App listening at port: ${port}` );
  }
});