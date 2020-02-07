(() => {

  const validation = setInterval( async () => {
    await fetch( '/main/console/validacao', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response.json();

    }).then((resp) => {
      console.log('validacao', resp)

      if ( resp.validacao ) {

        let sectionNode = document.getElementById('validacao__container');
        sectionNode.innerHTML = "";
        sectionNode.className = 'validacao__container validacao__container--active'

        let tableNode = document.createElement('table');

        tableNode.className = 'table__container table_container--shadow';

        let thead = document.createElement('thead');

        let trTitle = document.createElement('tr');
        trTitle.className = 'table__title';

        const titles = ['ID', 'Validacao'];

        titles.forEach( (title) => {
          let thTitle = document.createElement('th');
          thTitle.className = 'table__title--border';
          thTitle.innerHTML = title;

          trTitle.appendChild(thTitle);
        });

        thead.appendChild(trTitle);
      
        let tbody = document.createElement('tbody');

        resp.validacao.forEach( (item, index) => {
          
          trContent = document.createElement('tr'); 
          trContent.className = 'table__content';

          let tdContentID = document.createElement('td');
          tdContentID.className = 'table__content--border';

          let tdContent = document.createElement('td');
          tdContent.className = 'table__content--border';

          tdContentID.innerHTML = index;
          tdContent.innerHTML = Object.keys(item) + ' ' + Object.values(item);

          trContent.appendChild(tdContentID);
          trContent.appendChild(tdContent);
          tbody.appendChild( trContent );

        });
        tableNode.appendChild(thead);
        tableNode.appendChild(tbody);
        sectionNode.appendChild(tableNode);

        clearInterval(validation);
      }
    }).catch( (err) => {
      console.log('Erro Fetch', err);
    });
  }, 10000 );

})();