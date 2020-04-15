(() => {

  const status = setInterval( async () => { 
    await fetch( '/main/console/status',
     {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
     }
     ).then( ( response ) => {
          return response.json();
  
      }).then( ( resp ) => {
        console.log('Status', resp );

        if ( resp.erro ) {
          let spinner =  document.getElementById('spinner');
          if ( spinner )
            spinner.classList.add('loaded');
          
          resp.erro.forEach( ( c ) => { alert( Object.values( c ).toString() ); } );
          clearInterval(status);
        }
    
      }).catch((err) => {
        console.log('Erro Fetch', err);
      });
    }, 5000 );

})();