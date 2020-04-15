( () => {

  var projectContainers = document.querySelectorAll( '.modal__trigger' ).forEach( trigger => {

    trigger.addEventListener( 'click', ( e ) => {

      var deleteIcons = document.querySelectorAll( '.project__container--delete' );
   
      deleteIcons.forEach( i => i.classList.remove('project__icon-show') );
    });
  });


  var projectCloses = document.querySelectorAll('.modal__close').forEach( close => {

    close.addEventListener( 'click', () => {

      var deleteIcons = document.querySelectorAll( '.project__container--delete' );
   
      deleteIcons.forEach( i => i.classList.add('project__icon-show') )
    });

  });
})();