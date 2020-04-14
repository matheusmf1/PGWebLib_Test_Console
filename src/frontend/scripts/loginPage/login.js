(() => {

  const hideLoginTab = document.querySelector( '#login' );
  hideLoginTab.style.display = 'none';

  tabs = document.querySelectorAll('.tab__content');

  tabs.forEach( ( tab ) => {

    tab.addEventListener('click', ( i ) => {
      i.preventDefault();
      let parent = i.target.parentNode;

      othertab = document.getElementsByClassName('active');

      othertab[0].classList.remove('active')

      const hideForgotTab = document.querySelector( '#forgot_password' );
      hideForgotTab.style.display = 'none';

      parent.classList.add('active');
    
      let target = i.target.getAttribute('href');

      let hideTab = document.querySelector(`.tab-content > div:not(${target})`);
      hideTab.style.display = 'none';

      let showTab = document.querySelector(`${target}`);
      showTab.style.display = 'block';
    });
  });


  const forgotPassword = document.querySelector( '#forgot_btn' );
 
  forgotPassword.addEventListener( 'click', ( e ) => {
    e.preventDefault();

    let tabActive = document.querySelectorAll( '.active' );
    let tabActiveName =  tabActive[0].firstChild.hash;

    let closeTab = document.querySelector( tabActiveName );
    closeTab.style.display = 'none';

    let showTab = document.querySelector( '#forgot_password' );
    showTab.style.display = 'block';
  });

  const backToLogin = document.querySelector( '.backToLogin' );
 
  backToLogin.addEventListener( 'click', ( e ) => {
    e.preventDefault();

    let closeTab = document.querySelector( '#forgot_password' );
    closeTab.style.display = 'none';

    let loginTab = document.querySelector( '#login' );
    loginTab.style.display = 'block';

  });
  
})();