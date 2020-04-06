( () => {

  const openValidation = document.querySelectorAll( '.card__container' ).forEach( item => {

    item.addEventListener('click', async () => {
      let  projTitle = item.parentNode.parentNode.parentNode.children[0].innerHTML;
      let valTitle = item.querySelector('.card__content--text').innerHTML;
      await window.open( `/main/validation/${projTitle}/${valTitle}`, '_blank');

    });
  });
})();

