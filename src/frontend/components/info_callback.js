( () => {

  const close = document.querySelectorAll( ".alert__closebtn" );

  close.forEach( ( alert ) => {

    alert.addEventListener( 'click', () => {

      let div = document.querySelector('.alert__container');
      div.style.opacity = '0';
      setTimeout( () => div.style.display = "none" , 600 );

    });

  });

})();