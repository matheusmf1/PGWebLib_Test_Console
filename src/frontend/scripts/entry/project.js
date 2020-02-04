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

    const formNode = document.createElement('form');
      formNode.setAttribute('action','/main/projects');
      formNode.setAttribute('method','post');

    // --- Title Area ---
    const divTitle = document.createElement('div');
      divTitle.className = 'form__content';

      const label = document.createElement('label');
        label.className = 'form__content--label';
        label.innerHTML = 'Nome do Projeto';
      const input = document.createElement('input');
        input.setAttribute('type', 'text');
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
      inputDescrip.setAttribute('name', 'description');

    divDescription.appendChild(labelDescrip);
    divDescription.appendChild(inputDescrip);
    formNode.appendChild(divDescription);

    // --- Password Area ---
    const divPass = document.createElement('div');
      divPass.className = 'form__content';
    const labelPass = document.createElement('label');
      labelPass.className = 'form__content--label';
      labelPass.innerHTML = 'Senha';
    const inputPass = document.createElement('input');
      inputPass.setAttribute('type', 'password');
      inputPass.setAttribute('name', 'password');
      inputPass.setAttribute('required autocomplete','off');

    divPass.appendChild(labelPass);
    divPass.appendChild(inputPass);
    formNode.appendChild(divPass);
  
    const button = document.createElement('button');
      button.className = 'button-login button-block';
      button.setAttribute('type', 'submit');
      button.innerHTML = 'Adicionar';
  

    // --- Close Icon ---
    const anchor = document.createElement('a');
      anchor.setAttribute('href','');
      anchor.className = 'modal__close demo-close';

      const svg = document.createElement('svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        const path = document.createElement('path');
          path.setAttribute('d','M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z');

        const path2 = document.createElement('path');
          path2.setAttribute('d','M0 0h24v24h-24z');
          path2.setAttribute('fill','none');

      svg.appendChild(path);
      svg.appendChild(path2);

    anchor.appendChild(svg);  
  
  
  formNode.appendChild(button);
  formNode.appendChild(anchor);
  divContent.appendChild(formNode);
  divModal.appendChild(divContent);
  findSection.appendChild(divModal);

  });


})();