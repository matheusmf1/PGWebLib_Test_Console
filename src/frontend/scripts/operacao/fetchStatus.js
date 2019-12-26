(() => {

  const status = setInterval( () => { 
     fetch('http://localhost:3000/operacao/status',
     {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
     }
     ).then( ( response ) => {
          return response.json();
  
      }).then( ( resp ) => {
        console.log('Status', resp);

        if ( resp.erro ) {
         
          let sectionNode = document.getElementById('comprovante__container');
  
          let ulNode = document.createElement('ul');

          resp.erro.forEach( ( c ) => {
            let liNode = document.createElement('li');
            liNode.classList = 'comprovante__lista--titulo';
    
            liNode.innerHTML = Object.values(c).toString();
  
            ulNode.appendChild(liNode);
          });

          sectionNode.appendChild(ulNode);
          clearInterval(status);
        }
    
      }).catch((err) => {
        console.log('Erro Fetch', err);
      });
    }, 10000 );

})();