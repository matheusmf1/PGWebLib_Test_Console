(() => {

  const update = setInterval( () => { 
     fetch('http://localhost:3000/operacao/addresultado',
     {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
     }
     ).then( (response) => {
          return response.json();
  
      }).then( ( resp ) => {
        console.log('Result', resp)
  
        if ( resp.comprovante ) {
  
        let sectionNode = document.getElementById('comprovante__container');
  
        let ulNode = document.createElement('ul');
  
        ulNode.className = 'comprovante__lista';
  
        resp.comprovante.forEach((c) => {
          let liNode = document.createElement('li');
          liNode.classList = 'comprovante__lista--titulo';
  
          liNode.innerHTML = Object.keys(c).toString().replace(/_/g, ' ');
  
          divNode = document.createElement('div');
          divNode.classList = 'comprovante__lista--conteudo';
  
          divNode.innerHTML = Object.values(c);
  
          liNode.appendChild(divNode);
          ulNode.appendChild(liNode);
        });
  
          sectionNode.appendChild(ulNode);
          clearInterval(update);
        }
      }).catch((err) => {
        console.log('Erro Fetch', err);
      });
    }, 20000 );


document.getElementById('inputData').addEventListener('click',  () => {
}, false);
  
})();