( () => {

  const navItems = document.querySelectorAll('.nav__items--content');
  navItems.forEach( item => {

    item.addEventListener( 'click', i => {
      i.preventDefault();
     
      const oldTab = document.getElementsByClassName('active');
      oldTab[0].classList.remove('active');

      const newTab = i.target;
      newTab.classList.add('active');

      const oldTarget = document.querySelector('.tab__container');
      oldTarget.classList.remove('tab__container');
      oldTarget.classList.add('noshow');

      const contentTarget = document.querySelectorAll(`#${ newTab.id }`);
      contentTarget[1].classList.remove('noshow');
      contentTarget[1].classList.add('tab__container');

    });
  });

})();