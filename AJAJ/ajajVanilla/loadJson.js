window.onload = function () {
    async function promiseProvsCantDis() {
        const response = await fetch("prueba.json");
        const data = await response.json();
        return data;
    }

    promiseProvsCantDis().then((data) => {
        const provinciacantonInfo = data;
        console.log(data)
        const provinciaSelect = document.querySelector("#Provincia"),
          cantonSelect = document.querySelector("#Canton"),
          distritoSelect = document.querySelector("#Distrito");
      
        cantonSelect.disabled = true;
        distritoSelect.disabled = true;
      
        for (let provincia in provinciacantonInfo) {
          provinciaSelect.options[provinciaSelect.options.length] = new Option(
            provincia,
            provincia
          );
        }
      
        provinciaSelect.onchange = (e) => {
          cantonSelect.disabled = false;
          cantonSelect.length = 1;
          distritoSelect.length = 1;
      
          for (let canton in provinciacantonInfo[e.target.value]) {
            cantonSelect.options[cantonSelect.options.length] = new Option(
              canton,
              canton
            );
          }
        };
      
        cantonSelect.onchange = (e) => {
          distritoSelect.disabled = false;
          distritoSelect.length = 1;
          for (let distrito in provinciacantonInfo[provinciaSelect.value][e.target.value]) {
            distritoSelect.options[distritoSelect.options.length] = new Option(
              distrito,
              distrito
            );
          }
        };
    });
};