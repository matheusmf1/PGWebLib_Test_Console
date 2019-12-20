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
      let parent = i.target.parentNode;

      othertab = document.getElementsByClassName('active');
      othertab[0].classList.remove('active')

      parent.classList.add('active');
    
      let target = i.target.getAttribute('href');

      hideTab = document.querySelector(`.tab-content > div:not(${target})`);
      showTab = document.querySelector('.tab-content > div');

      // fadeOut(hideTab, 600);
      // fadeIn(showTab, 600);

    });
  });

  function fadeIn(elem, ms) {
    elem.style.opacity = 0;
  
    if (ms) {
      let opacity = 0;
      const timer = setInterval(function() {
        opacity += 50 / ms;
        if (opacity >= 1) {
          clearInterval(timer);
          opacity = 1;
        }
        elem.style.opacity = opacity;
      }, 50);
    } else {
      elem.style.opacity = 1;
    }
  }

  function fadeOut(el, ms) {
    if (ms) {
      el.style.transition = `opacity ${ms} ms`;
      el.addEventListener(
        'transitionend',
        function(event) {
          el.style.display = 'none';
        },
        false
      );
    }
    el.style.opacity = '0';
  }


  $('.tab a').on('click', function (e) {
    
    e.preventDefault();
    
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
    
    target = $(this).attr('href');
  
    $('.tab-content > div').not(target).hide();
    
    $(target).fadeIn(600);
    
  });
  
})();