(() => {

  const check = setInterval( async () => {

    await fetch('/main/console/loading', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: 'cors'
    }).then( ( response ) => {
      if (response.status === 200)
        return response.json();

    }).then((resp) => {
      console.log('resp ', resp);

      if ( resp.trigger ) {

        let sectionNode = document.getElementById('comprovante__container');
        sectionNode.innerHTML = "";
        sectionNode.className = 'comprovante__container comprovante__container--active';

        let mainDiv = document.createElement('div');
        mainDiv.className = "spinner__container";
        mainDiv.id = "spinner";

        let innerDiv = document.createElement('div');
        innerDiv.className = "spinner type1";

        let span = document.createElement('span');
        span.innerHTML = 'Aguarde...';

        innerDiv.appendChild(span);
        mainDiv.appendChild(innerDiv);

        sectionNode.appendChild(mainDiv);
        clearInterval(check);
      }
    }).catch( error => {
      console.log('Error on addSpinner ', error );
    })
  }, 2000 );

})();