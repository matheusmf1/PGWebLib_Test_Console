(() => {

  let dataFile = '';
 
    const chooseFile = document.getElementById('chooseFile');
    const fileDisplayArea = document.getElementById('informationArea');
    document.querySelector('input[name="inputData"]').defaultChecked = 'true';


    chooseFile.addEventListener('change', ( e ) => {
      const file = chooseFile.files[0];
      const textType = /json.*/;

      if ( file.type.match(textType) ) {
        const reader = new FileReader();

        reader.onload = (e) => {
  
          fileDisplayArea.innerText = reader.result;
          dataFile = reader.result;
        }
        reader.readAsText( file );
      } else {
        fileDisplayArea.innerText = "Arquivo não suportado!"
      }
    });
  
  
  
  document.getElementById("inputData").addEventListener("click", () => {
    const fileData = JSON.parse( dataFile );
    let radioBtn = document.querySelector('input[name="inputData"]:checked').value;

    data = {
      operacao: radioBtn,
      dados: fileData
    };
    
    document.getElementById("inputData").value =  JSON.stringify( data );
  }, false);


  const operationsOp = document.querySelectorAll('input[name="inputData"]')[0];
  operationsOp.addEventListener('click', () => { 
    document.getElementById('inputData').addEventListener('click', () => {
      setTimeout('clearInterval(update)', 70000);
     });
  });

  const validationOp = document.querySelectorAll('input[name="inputData"]')[1];
  validationOp.addEventListener('click', () => {
     document.getElementById('inputData').addEventListener('click', () => {
      setTimeout('clearInterval(validation)', 70000);
     });
  });

  document.getElementById('inputData').addEventListener('mousedown', () => {
    let checkArea =  document.getElementById('informationArea').firstElementChild;
   
    if ( checkArea.localName === "br" ) 
      document.getElementById('inputData').disabled  = false;
    
    if ( checkArea.localName === "p" ) {
      document.getElementById('inputData').disabled  = true;
      alert('Selecione algum arquivo');
      document.getElementById('inputData').disabled  = false;
    }
  });
})();