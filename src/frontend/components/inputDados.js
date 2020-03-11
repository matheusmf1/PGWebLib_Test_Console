(() => {

  let dataFile = '';

  const chooseFile = document.getElementById('chooseFile');
  const fileDisplayArea = document.getElementById('informationArea');
  const submitBtn = document.getElementById('inputData');

  document.querySelector( 'input[name="inputData"]' ).defaultChecked = 'true';


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
    const fileData = JSON.parse(dataFile);
    let radioBtn = document.querySelector( 'input[name="inputData"]:checked' ).value;

    data = {
      operacao: radioBtn,
      dados: fileData
    };

    submitBtn.value = JSON.stringify( data );
  }, false);


  const operationsOp = document.querySelectorAll( 'input[name="inputData"]' )[0];
    operationsOp.addEventListener('click', () => {
      submitBtn.addEventListener('click', () => {
        setTimeout('clearInterval(update)', 70000);
      });
    });


  const validationOp = document.querySelectorAll('input[name="inputData"]')[1];
    validationOp.addEventListener('click', () => {
      submitBtn.addEventListener('click', () => {
        setTimeout('clearInterval(validation)', 70000);
      });
    });


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