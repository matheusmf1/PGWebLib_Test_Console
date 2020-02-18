( () => {

  const openValidation = document.querySelectorAll( '.card__container' ).forEach( item => {
    item.addEventListener('click', async () => {
      let title = item.querySelector('.card__content--text').innerHTML;
      await window.open( `/main/validation/${title}`, '_blank');    
    });
  });
})();