(() => {

  let dataFile = '';
  window.onload = () => {
    const fileInput = document.getElementById('fileInput');
    const fileDisplayArea = document.getElementById('informationArea');
    document.querySelector('input[name="inputData"]').defaultChecked = 'true';


    fileInput.addEventListener('change', (e) => {
      const file = fileInput.files[0];
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
  };
  
  
  document.getElementById("inputData").addEventListener("click", () => {
    const fileData = JSON.parse( dataFile );
    let radioBtn = document.querySelector('input[name="inputData"]:checked').value;

    data = {
      operacao: radioBtn,
      dados: fileData
    };
    
    document.getElementById("inputData").value =  JSON.stringify( data );
  }, false);
  
})();