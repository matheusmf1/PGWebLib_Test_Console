(() => {

  tabs = document.querySelectorAll('.tab__content');

  tabs.forEach( ( tab ) => {
    tab.addEventListener('click', ( i ) => {
      i.preventDefault();
      let parent = i.target.parentNode;

      othertab = document.getElementsByClassName('active');
      othertab[0].classList.remove('active')

      parent.classList.add('active');
    
      let target = i.target.getAttribute('href');

      hideTab = document.querySelector(`.tab-content > div:not(${target})`);
      hideTab.style.display = 'none';

      showTab = document.querySelector(`${target}`);
      showTab.style.display = 'block';
    });
  });
  
})();