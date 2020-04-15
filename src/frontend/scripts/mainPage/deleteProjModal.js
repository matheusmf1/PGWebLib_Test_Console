( () => {

  const projectDelete = document.querySelectorAll( '.project__container--delete' ).forEach( project => {
    project.addEventListener( 'click', () => {

      const projectName = project.nextElementSibling.text; 
      console.log('project:', projectName )

      const findSection = document.querySelector('main section');
      findSection.innerHTML = "";

      let sectionContainer = document.createElement( 'section' );
        sectionContainer.className = "delete__container";


      // let deleteForm = document.createElement('form');
      //   deleteForm.setAttribute( 'action', `/main/projs/${projectName}` );
      //   deleteForm.setAttribute('method', 'delete');
      //   deleteForm.className = 'delete__content';

      
      let deleteForm = document.createElement('div');
        deleteForm.className = 'delete__content';

      let warningsContainer = document.createElement('div');
        warningsContainer.className = 'warnings__container';

      let messageTitle = document.createElement('h1');
        messageTitle.innerHTML = `Apagar ${projectName}`;
        messageTitle.className = 'delete__container--title '

      let messageContent = document.createElement('p');
        messageContent.innerHTML = 'Você tem certeza que quer pagar tal projeto e suas validações?';
        messageContent.className = 'delete__container--content ';

      let buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'buttons__container';


      let anchor = document.createElement('a');
        anchor.href = '';
        anchor.className = 'button__deleteModal cancel__button';
        anchor.innerHTML = 'Cancelar';


      let deletelBt = document.createElement('button');
        deletelBt.type = 'submit';
        deletelBt.addEventListener( 'click', async () => { 

            await fetch( `/main/projs/${projectName}`,
            {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors'
            }
            ).then( ( response ) => {
                return response.json();
        
            }).then( ( resp ) => {
              console.log('Status', resp );
              window.location.href = "";
               
            }).catch((err) => {
              console.log('Erro Fetch', err);
            });
        
        });
        deletelBt.className = 'button__deleteModal delete__button';
        deletelBt.innerHTML = 'Apagar';  


      // buttons into div container
      buttonsContainer.appendChild( anchor );
      buttonsContainer.appendChild( deletelBt );

      
      // warnings into div container 
      warningsContainer.appendChild( messageTitle );
      warningsContainer.appendChild( messageContent );
      warningsContainer.appendChild( buttonsContainer );


      // add contents into form
      deleteForm.appendChild( warningsContainer );

      // add form into delete section
      sectionContainer.appendChild( deleteForm );


      findSection.appendChild( sectionContainer )

    });
  
  });

})();