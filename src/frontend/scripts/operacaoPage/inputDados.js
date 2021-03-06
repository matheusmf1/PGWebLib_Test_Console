(() => {

  let dataFile = '';

  const chooseFile = document.getElementById('chooseFile');
  const fileDisplayArea = document.getElementById('informationArea');
  const submitBtn = document.getElementById('inputData');


  chooseFile.addEventListener('change', (e) => {
    const file = chooseFile.files[0];
    const textType = /json.*/;

    if ( file.type.match( textType ) ) {
      const reader = new FileReader();

      reader.onload = (e) => {

        fileDisplayArea.innerText = reader.result;
        dataFile = reader.result;
      }
      reader.readAsText(file);
    } else {
      fileDisplayArea.innerText = "Arquivo não suportado!"
    }
  });



  submitBtn.addEventListener("click", () => {
    const fileData = JSON.parse( dataFile );
    submitBtn.value = JSON.stringify( fileData );
  }, false);


  submitBtn.addEventListener('mousedown', () => {
    let checkArea = document.getElementById('informationArea').firstElementChild;

    if (checkArea.localName === "br")
     submitBtn.disabled = false;

    if (checkArea.localName === "p") {
      submitBtn.disabled = true;
      alert('Selecione algum arquivo');
      submitBtn.disabled = false;
    }
  });
  
})();