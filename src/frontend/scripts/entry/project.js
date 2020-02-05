( () => {

  const findSubMenu = document.getElementById('newProj').addEventListener( 'click', () => {

    const findSection = document.querySelector('.info');
    findSection.innerHTML = "";

    const divModal = document.createElement('div');
      divModal.setAttribute('id','newProj');
      divModal.className = 'modal modal--active';
      divModal.setAttribute('role', 'dialog');
      divModal.setAttribute('aria-hidden', 'true');

    const divContent = document.createElement('div');
      divContent.className = 'modal__dialog modal__content modal__content--active';

      const h1Title = document.createElement('h1');
      h1Title.innerHTML = "Novo Projeto";
   
      divContent.appendChild(h1Title);

    const formNode = document.createElement('form');
      formNode.setAttribute('action','/main/projects');
      formNode.setAttribute('method','post');
      formNode.className = 'form'

    // --- Title Area ---
    const divTitle = document.createElement('div');
      divTitle.className = 'form__content';


      const label = document.createElement('label');
        label.className = 'form__content--label';
        label.innerHTML = 'Nome';
      const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.required = true
        input.setAttribute('autocomplete','off');
        input.setAttribute('name', 'title');

    divTitle.appendChild(label);
    divTitle.appendChild(input);
    formNode.appendChild(divTitle);

    // --- Description Area ---
    const divDescription = document.createElement('div');
     divDescription.className = 'form__content';
    const labelDescrip = document.createElement('label');
      labelDescrip.className = 'form__content--label';
      labelDescrip.innerHTML = 'Descrição';
    const inputDescrip = document.createElement('input');
      inputDescrip.setAttribute('type', 'text');
      input.required = true
      input.setAttribute('autocomplete','off');
      inputDescrip.setAttribute('name', 'description');

    divDescription.appendChild(labelDescrip);
    divDescription.appendChild(inputDescrip);
    formNode.appendChild(divDescription);

    // // --- Password Area ---
    // const divPass = document.createElement('div');
    //   divPass.className = 'form__content';
    // const labelPass = document.createElement('label');
    //   labelPass.className = 'form__content--label';
    //   labelPass.innerHTML = 'Senha';
    // const inputPass = document.createElement('input');
    //   inputPass.setAttribute('type', 'password');
    //   input.required = true
    //   input.setAttribute('autocomplete','off');
    //   inputPass.setAttribute('name', 'password');

    // divPass.appendChild(labelPass);
    // divPass.appendChild(inputPass);
    // formNode.appendChild(divPass);
  
    const button = document.createElement('button');
      button.className = 'button-login button-block';
      button.setAttribute('type', 'submit');
      button.innerHTML = 'Adicionar';
  

    // --- Close Icon ---
    const anchor = document.createElement('a');
    anchor.href = '/main/projects';
    anchor.className = 'modal__close demo-close';

    anchor.innerHTML = `<svg viewBox="0 0 24 24">
    <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"></path>
    <path d="M0 0h24v24h-24z" fill="none"></path>
  </svg`

  
  formNode.appendChild(button);
  formNode.appendChild(anchor);
  divContent.appendChild(formNode);
  divModal.appendChild(divContent);
  findSection.appendChild(divModal);

  const inputs = document.querySelectorAll('input');

  inputs.forEach( ( textField ) => {

    textField.addEventListener('keyup', ( event ) => {

      let label = textField.previousElementSibling;
  
      if ( event.target.value === '')
        label.classList.remove('active');
      
      else
        label.classList.add('active');  
    });

    textField.addEventListener('blur', ( event ) => {
      let label = textField.previousElementSibling;
  
      if ( event.target.value === '')
        label.classList.remove('active');
      
    });

  });
  });

})();