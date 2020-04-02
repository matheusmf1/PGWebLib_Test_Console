(() => {

  const update = setInterval( async () => {
    await fetch('/main/console/resultado', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors'
    }).then(( response ) => {
      if ( response.status === 200 )
        return response.json();

    }).then( ( resp ) => {
      console.log('Result', resp );

      if ( resp.comprovante ) {

        let spinner =  document.getElementById('spinner');
        spinner.classList.add('loaded');

        let sectionNode = document.getElementById('comprovante__container');
        sectionNode.innerHTML = "";
        sectionNode.className = 'comprovante__container comprovante__container--active';

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

    }).catch( (err) => {
      console.log('Erro Fetch', err);
    });
  }, 10000 );

})();