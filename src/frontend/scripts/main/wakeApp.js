( () => {

  const startApp = window.addEventListener('load', async () => {

    console.log('page has loaded')
    await fetch('/settings', {
      method:'post'
    }).then( (response) => {
      console.log('response ', response);
      return response;
    }).catch( (resp) => console.log('resp: ', resp ) );

  });

})();