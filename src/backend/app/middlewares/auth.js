const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth.json');


module.exports = ( req, res, next ) => {
  const cookieToken = req.headers.cookie;

  if( !cookieToken )
    return res.status(401).redirect('/');
   // return res.status(401).send( { error: 'No token Provided' } );

  const parts = cookieToken.split('=');

  if ( !parts.length === 2 )
    return res.status(401).send( { error: 'Token Error' } )
  
  const [ scheme, token ] = parts;

  if ( !/^tokenKey$/i.test(scheme) )
    return res.status(401).send( { error: 'Token malformatted' } );

  jwt.verify( token, authConfig.secret, ( err, decoded ) => {
    if( err )
     return res.status(401).send( { error: 'Token invalid' } );

    req.userId = decoded.id;

    return next();
  });
}