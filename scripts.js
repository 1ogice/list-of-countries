let url = `https://restcountries.com/v3.1/all`;

(function APIcall() {
  axios.get(url).then((res) => {
    res.data.sort(function (a, b) {
      if (a.name.common.toUpperCase() < b.name.common.toUpperCase()) {
        return -1;
      }
    });
    templateGeneration(res.data);
  });
})();

function templateGeneration(data) {
  for (let i = 0; i < data.length; i++) {
    let allCountries = document.getElementById("countriesField");

    let countryDiv = document.createElement("div");
    countryDiv.className = "countryDiv";

    allCountries.appendChild(countryDiv);

    let countryFlagDiv = document.createElement("div");
    countryFlagDiv.className = "countryFlagDiv";

    countryDiv.appendChild(countryFlagDiv);

    let countryFlag = document.createElement("img");
    countryFlag.src = data[i].flags.png;
    countryFlag.className = "countryFlag";

    countryFlagDiv.appendChild(countryFlag);

    let countryName = document.createElement("p");
    countryName.className = "countryName";
    countryName.innerHTML = data[i].name.common;

    countryDiv.appendChild(countryName);

    let countryPopulation = document.createElement("p");
    countryPopulation.className = "countryPopulation";
    countryPopulation.innerHTML = "Population: ";
    let countryPopulationValue = document.createElement("span");
    countryPopulationValue.className = "countryPopulationValue";
    countryPopulationValue.innerHTML = fixNum(data[i].population);
    if (data[i].population === 0) {
      countryPopulationValue.innerHTML = "Uninhabited";
    }

    countryDiv.appendChild(countryPopulation);
    countryPopulation.appendChild(countryPopulationValue);

    let countryRegion = document.createElement("p");
    countryRegion.className = "countryRegion";
    countryRegion.innerHTML = "Region: ";
    let countryRegionValue = document.createElement("span");
    countryRegionValue.className = "countryRegionValue";
    countryRegionValue.innerHTML = data[i].region;

    countryDiv.appendChild(countryRegion);
    countryRegion.appendChild(countryRegionValue);

    let countryCapital = document.createElement("p");
    countryCapital.className = "countryCapital";
    countryCapital.innerHTML = "Capital: ";
    let countryCapitalValue = document.createElement("span");
    countryCapitalValue.className = "countryCapitalValue";
    countryCapitalValue.innerHTML = data[i].capital;
    if (data[i].capital === undefined) {
      countryCapitalValue.innerHTML = "None";
    }

    countryDiv.appendChild(countryCapital);
    countryCapital.appendChild(countryCapitalValue);

    function regionSearch() {
      if (selectRegion.value === "") {
        allSearch();
      } else if (
        selectRegion.value === countryRegionValue.innerHTML &&
        countryName.innerHTML
          .toUpperCase()
          .indexOf(searchInput.value.toUpperCase()) > -1
      ) {
        countryDiv.style.display = "";
      } else {
        countryDiv.style.display = "none";
      }
    }

    document.addEventListener("keyup", regionSearch);
    selectRegion.addEventListener("change", regionSearch);

    function allSearch() {
      if (
        countryName.innerHTML
          .toUpperCase()
          .indexOf(searchInput.value.toUpperCase()) > -1
      ) {
        countryDiv.style.display = "";
      } else {
        countryDiv.style.display = "none";
      }
    }
  }
}

function fixNum(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function darkMode() {
  let body = document.body;
  body.classList.toggle("dark-mode-body");
}
document.querySelector("#themeModeBtn").addEventListener("click", darkMode);
