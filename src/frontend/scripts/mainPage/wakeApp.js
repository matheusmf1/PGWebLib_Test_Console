( () => {

  const startApp = window.addEventListener( 'load', async () => {
    
    await fetch('/settings', {
      method:'post'
    }).then( (response) => {
      console.log('response ', response);
      return response;
    }).catch( (resp) => console.log('resp: ', resp ) );

  });


  window.addEventListener( 'load', async () => {
    
    const setupFeedBack = setInterval( async () => {

      await fetch( '/settings/setup', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
     })
     .then( ( response ) => {
          return response.json();
  
      }).then( ( resp ) => {
        console.log('setupOk', resp );

        if ( resp.ok === true ) {
          
          alert('Aplicação Inicializada com Sucesso!');

          clearInterval(setupFeedBack);
        } else if ( resp.ok ===  false ) {
          alert('Aplicação Não Inicializada!');
        }
    
      }).catch((err) => {
        console.log('Erro Fetch setupOk', err);
      });

    }, 2000 );


  });

})();