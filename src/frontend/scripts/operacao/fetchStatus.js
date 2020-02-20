(() => {

  const status = setTimeout( async () => { 
    await fetch( '/main/console/status',
     {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
     }
     ).then( ( response ) => {
          return response.json();
  
      }).then( ( resp ) => {
        console.log('Status', resp);

        if ( resp.erro ) {
          resp.erro.forEach( ( c ) => {
            alert( Object.values( c ).toString() );
      
          });
          clearTimeout(status);
        }
    
      }).catch((err) => {
        console.log('Erro Fetch', err);
      });
    }, 50000 );

})();