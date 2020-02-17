(() => {

  const validation = setInterval(async () => {
    await fetch('/main/console/validacao', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    }).then((response) => {
      return response.json();

    }).then((resp) => {
      console.log('validacao', resp);

      if (resp.validacao) {

        let sectionNode = document.getElementById('validacao__container');
        sectionNode.innerHTML = "";
        sectionNode.className = 'validacao__container validacao__container--active';

        // Container para opção de salvar
        let divOption = document.createElement('div');
        divOption.className = "table__option";

        let saveOp = document.createElement('a');
        saveOp.className = "table__option--text";
        saveOp.id = "saveOp";
        saveOp.innerHTML = "Salvar";

        let cleanOp = document.createElement('a');
        cleanOp.className = "table__option--text";
        cleanOp.innerHTML = "Limpar Dados";

        divOption.appendChild(saveOp);
        divOption.appendChild(cleanOp);

        // Container da tabela

        let tableNode = document.createElement('table');

        tableNode.className = 'table__container table_container--shadow';

        let thead = document.createElement('thead');

        let trTitle = document.createElement('tr');
        trTitle.className = 'table__title';

        const titles = ["PWINFO's", 'VALIDAÇÃO'];

        titles.forEach((title) => {
          let thTitle = document.createElement('th');
          thTitle.className = 'table__title--border';
          thTitle.innerHTML = title;

          trTitle.appendChild(thTitle);
        });

        thead.appendChild(trTitle);

        let tbody = document.createElement('tbody');

        let valData = [];
        resp.validacao.forEach(item => {
          trContent = document.createElement('tr');
          trContent.className = 'table__content';

          let tdContentID = document.createElement('td');
          tdContentID.className = 'table__content--border table__content--left';

          let tdContent = document.createElement('td');
          tdContent.className = 'table__content--border table__content--right';

          tdContentID.innerHTML = Object.keys(item);
          tdContent.innerHTML = Object.values(item);

          valData.push( item );
      
          trContent.appendChild(tdContentID);
          trContent.appendChild(tdContent);
          tbody.appendChild(trContent);

        });
        tableNode.appendChild(thead);
        tableNode.appendChild(tbody);
        sectionNode.appendChild(divOption);
        sectionNode.appendChild(tableNode);

        clearInterval(validation);

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


        const postValidations = document.getElementById('saveOp').addEventListener('click', async () => {

          const divModal = document.createElement('div');
            divModal.setAttribute('id', 'newProj');
            divModal.className = 'modal modal--active';
            divModal.setAttribute('role', 'dialog');
            divModal.setAttribute('aria-hidden', 'true');

          const divContent = document.createElement('div');
            divContent.className = 'modal__dialog modal__content modal__content--active';

          const h1Title = document.createElement('h1');
            h1Title.innerHTML = "Salvar Validação";

          divContent.appendChild(h1Title);

          const formNode = document.createElement('form');
            formNode.setAttribute('action', '/main/validation');
            formNode.setAttribute('method', 'post');
            formNode.className = 'form__ProjProject';

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
            input.required = true
            input.className = 'form__ProjContent--input';

          divTitle.appendChild(label);
          divTitle.appendChild(input);
          formNode.appendChild(divTitle);

          // --- Select Projects Area ---
          const divDescription = document.createElement('div');
            divDescription.className = 'form__ProjContent';

          const selectProj = document.createElement('select');
            selectProj.name = "projectTitle";
            selectProj.id = "selectProj";

          await fetch('/main/projs', {
            method: 'GET'
          }).then( (response) => {
            return response.json();
          }).then( (resp) => {
            console.log('projects', resp);

            resp.projects.forEach( ( proj ) => {
              let option = document.createElement('option');
              option.value = proj.title;
              option.innerHTML = proj.title;
              selectProj.appendChild( option );
            });

            divDescription.appendChild(selectProj);
            formNode.appendChild(divDescription);

          }).catch( (err) => {
            console.log('Erro Fetch', err);
          });


          // --- JSON Validation Data ---
          const jsonData = document.createElement('input');
            jsonData.name = "info";
            jsonData.style = "display: none";
            jsonData.value =  JSON.stringify(valData);

            formNode.appendChild( jsonData );
              

          // --- Button Submit --- 
          const button = document.createElement('button');
          button.className = 'button-login button-block';
          button.setAttribute('type', 'submit');
          button.setAttribute('id', 'submitBtn');
          button.innerHTML = 'Adicionar';

          // --- Close Icon ---
          const anchor = document.createElement('a');
          anchor.href = '';
          anchor.className = 'modal__close demo-close modal__anchor';

          anchor.innerHTML = `<svg viewBox="0 0 24 24">
        <path d="M19 6.41l-1.41-1.41-5.59 5.59-5.59-5.59-1.41 1.41 5.59 5.59-5.59 5.59 1.41 1.41 5.59-5.59 5.59 5.59 1.41-1.41-5.59-5.59z"></path>
        <path d="M0 0h24v24h-24z" fill="none"></path>
      </svg`

          formNode.appendChild(button);
          formNode.appendChild(anchor);
          divContent.appendChild(formNode);
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

        });
      }
    }).catch((err) => {
      console.log('Erro Fetch', err);
    });
  }, 10000);

})();