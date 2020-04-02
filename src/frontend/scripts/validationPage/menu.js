( () => {

  const contentData = document.querySelector('.validacao__title').innerText.split(" ");

  const projectTitle = contentData[0];
  const fileTitle = contentData[1];

  const changeBtn = document.querySelectorAll('.menu__item')[0];
  const delBtn = document.querySelectorAll('.menu__item')[1];

  changeBtn.addEventListener('click', async () => {

    let sectionNode = document.getElementById('validacao__container');
      sectionNode.innerHTML = "";

    const divModal = document.createElement('div');
      divModal.setAttribute('id', 'newProj');
      divModal.className = 'modal__container modal__container--active';
      divModal.setAttribute('role', 'dialog');
      divModal.setAttribute('aria-hidden', 'true');

    const divContent = document.createElement('div');
      divContent.className = 'modal__dialog modal__content modal__content--active';

    const h1Title = document.createElement('h1');
      h1Title.innerHTML = "Modificar Nome";

    divContent.appendChild(h1Title);

    const mainDivNode = document.createElement('div');
      mainDivNode.className = 'form__ProjProject';

    // --- Title Area ---
    const divTitle = document.createElement('div');
      divTitle.className = 'form__ProjContent';

    const label = document.createElement('label');
      label.className = 'form__ProjContent--label';
      label.innerHTML = 'Nome';

    const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('autocomplete', 'off');
      input.setAttribute('name', 'title');
      input.required = true;
      input.className = 'form__ProjContent--input';

    divTitle.appendChild(label);
    divTitle.appendChild(input);
    mainDivNode.appendChild(divTitle);

      // --- Button Submit --- 
      const button = document.createElement('button');
        button.className = 'button-login button-block';
        button.setAttribute('type', 'submit');
        button.setAttribute('id', 'updateBtn');
        button.innerHTML = 'Alterar';

     // --- Close Icon ---
     const anchor = document.createElement('a');
      anchor.href = '';
      anchor.className = 'modal__close demo-close modal__anchor';

     anchor.innerHTML = `<svg viewBox="0 0 24 24">
   <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"></path>
   <path d="M0 0h24v24h-24z" fill="none"></path>
 </svg`


    mainDivNode.appendChild(button);
    mainDivNode.appendChild(anchor);
    divContent.appendChild(mainDivNode);
    divModal.appendChild(divContent);
    sectionNode.appendChild(divModal);


    const inputs = document.querySelectorAll('input');
    inputs.forEach((textField) => {

      textField.addEventListener('keyup', (event) => {

        let label = textField.previousElementSibling;

        if (event.target.value === '')
          label.classList.remove('active');

        else
          label.classList.add('active');
      });

      textField.addEventListener('blur', (event) => {
        let label = textField.previousElementSibling;

        if (event.target.value === '')
          label.classList.remove('active');

      });
    });


    const updateBtn = document.getElementById('updateBtn').addEventListener('click', async () => {
      const newTitle = document.querySelector('.form__ProjContent--input');

      await fetch(`/main/validation/${fileTitle}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( {title: newTitle.value} )
      }).then( (response) => {
        return response.json();
      }).then( (resp) => {
        console.log('resp: ', resp);
        window.location.href = `/main/validation/${newTitle.value}`
      }).catch( (err) => {
  
      }).catch( (err) => {
        console.log('erro: ',err);
        window.close();
      });
    });

  });


  delBtn.addEventListener('click', async () => { 

    await fetch(`/main/validation/${projectTitle}/${fileTitle}`, {
      method: 'DELETE'
    }).then( (response) => {
      return response.json();
    }).then( (resp) => {
      console.log('resp: ', resp);
      // return resp.status === 200 ? window.close() : alert("Ocorreu um erro ao deletar");
    }).catch( (err) => {
      console.log('erro: ',err);
      window.close();
    });
  });

})();