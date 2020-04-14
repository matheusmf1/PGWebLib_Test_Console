( () => {

  const logout = document.querySelectorAll('.menu__item');

  logout.forEach( ( item ) => {

    if ( item.pathname === '/auth/logout' ){

      item.addEventListener('click', async () => { 
      
        await fetch('/settings/close', {
          method:'post'
        }).then( (response) => {
          console.log('response ', response);
          return response.json;
        }).then( (resp) => console.log('resp: ', resp ) );


       });

    }
    
  });
  
})();