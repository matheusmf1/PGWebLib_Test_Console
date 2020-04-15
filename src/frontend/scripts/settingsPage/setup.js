(() => {

  const navItems = document.querySelectorAll('.nav__items--content');
  navItems.forEach(item => {

    item.addEventListener('click', async i => {
      i.preventDefault();
      
      if ( i.target.id === 'wakeApp') {
        await fetch('/settings', {
          method:'post'
        }).then( (response) => {
          console.log('response ', response);
          return response;
        }).catch( (resp) => console.log('resp: ', resp ) );
      } 
      else {

        const oldTab = document.getElementsByClassName('nav__items--active');
        oldTab[0].classList.remove('nav__items--active');
  
        const newTab = i.target;
       
        newTab.classList.add('nav__items--active');
  
        const oldTarget = document.querySelector('.tab__container');
        oldTarget.classList.remove('tab__container');
        oldTarget.classList.add('noshow');
  
        const contentTarget = document.querySelectorAll(`#${ newTab.id }`);
        contentTarget[1].classList.remove('noshow');
        contentTarget[1].classList.add('tab__container');
      }
    });
  });

})();