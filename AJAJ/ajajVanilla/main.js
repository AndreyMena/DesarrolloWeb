window.onload = function () {
    async function getCountryStateInfo() {  
        const response = await fetch("data2.json");
        const data = await response.json();
        console.log(data);
        return data;
    }

    getCountryStateInfo().then((data) => {
        const countryStateInfo = data;
        const countrySelection = document.querySelector("#Country"),
          stateSelection = document.querySelector("#State"),
          citySelection = document.querySelector("#City"),
          zipSelection = document.querySelector("#Zip");
      
        stateSelection.disabled = true;
        citySelection.disabled = true;
        zipSelection.disabled = true;
      
        for (let country in countryStateInfo) {
          countrySelection.options[countrySelection.options.length] = new Option(
            country,
            country
          );
        }
      
        // todo: Country Change
      
        countrySelection.onchange = (e) => {
          stateSelection.disabled = false;
          //   todo: Clear all options from state selection
          stateSelection.length = 1;
          citySelection.length = 1;
          zipSelection.length = 1;
      
          for (let state in countryStateInfo[e.target.value]) {
            stateSelection.options[stateSelection.options.length] = new Option(
              state,
              state
            );
          }
        };
      
        // todo: State Change
      
        stateSelection.onchange = (e) => {
          citySelection.disabled = false;
      
          citySelection.length = 1;
          zipSelection.length = 1;
      
          for (let city in countryStateInfo[countrySelection.value][e.target.value]) {
            citySelection.options[citySelection.options.length] = new Option(
              city,
              city
            );
          }
        };
      
        // todo: City Change
      
        citySelection.onchange = (e) => {
          zipSelection.disabled = false;
      
          zipSelection.length = 1;
      
          let zips =
            countryStateInfo[countrySelection.value][stateSelection.value][
              e.target.value
            ];
      
          for (let i = 0; i < zips.length; i++) {
            zipSelection.options[zipSelection.options.length] = new Option(
              zips[i],
              zips[i]
            );
          }
        };
    }
  };