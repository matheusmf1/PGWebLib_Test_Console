( () => {

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


})();