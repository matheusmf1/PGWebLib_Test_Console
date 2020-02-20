(() => {

  const inputs = document.querySelectorAll('input');

  inputs.forEach( ( textField ) => {

    textField.addEventListener('keyup', ( event ) => {

      let label = textField.previousElementSibling;
  
      if ( event.target.value === '')
        label.classList.remove('active', 'highlight');
      
      else
        label.classList.add('active', 'highlight');  
    });

    textField.addEventListener('blur', ( event ) => {
      let label = textField.previousElementSibling;
  
      if ( event.target.value === '')
        label.classList.remove('active', 'highlight');
      
      else
        label.classList.remove('highlight');   
    });
  
    textField.addEventListener('focus', ( event ) => {
      let label = textField.previousElementSibling;
  
      if ( event.target.value === '')
        label.classList.remove('highlight');
      
      else
        label.classList.add('highlight');   
    });
  });


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