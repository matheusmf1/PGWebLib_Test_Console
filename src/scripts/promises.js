let p = new Promise( ( resolve, reject ) => {
  let a = 1 + 1;
  if ( a === 2 ){
    resolve('Success');
  } else {
    reject('Falied');
  }
} );

// Then will be called when the promise resolves SUCCESS  
// And reject will be colled when the promise FAILS

p.then( ( message ) => {
  console.log( 'This is in the then ' + message );
}).catch( ( message ) => {
  console.log( 'This is in the catch ' + message );
})

