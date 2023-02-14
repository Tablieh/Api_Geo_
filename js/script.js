/* const result = document.querySelector(".result");

fetch("https://geo.api.gouv.fr/communes?codePostal=67100&fields=nom,code,codesPostaux,siren,codeEpci,codeDepartement,codeRegion,region,population&format=json&geometry=centre")
.then((response) => response.json())
.then((data) => {
    console.log(data)
    result.innerHTML = data[0].nom + "( " + data[0].region.nom + " )" + "<br>"
    result.innerHTML += data[0].population + " habitants<br>"
    
    result.innerHTML += "Les code postaux associés sont : <br>"
    data[0].codesPostaux.forEach(codePostal => {
        result.innerHTML += codePostal + "<br>"
    });
}) */
const result = document.querySelector(".result");
const form = document.getElementById("form");
const codePostalInput = document.getElementById("code-postal-input");
const townSelect = document.getElementById("town-select");
const townInfo = document.querySelector(".town-info");
const populationInfo = document.getElementById("population");

function searchCommuneByCodePostal(codePostal) {
  const apiUrl = `https://geo.api.gouv.fr/communes?codePostal=${codePostal}&fields=nom,code,codesPostaux,siren,codeEpci,codeDepartement,codeRegion,region,population&format=json&geometry=centre`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const Box = document.createElement("div");
        Box.innerHTML = `
          <p>Les code postaux associés sont :</p>
          <ul>
            ${data[0].codesPostaux.map((code) => `<li>${code}</li>`).join("")}
          </ul>
        `;
        {/* 
            this to put in innerhtml before this comment if needed
            <p>${data[0].nom} (${data[0].region.nom})</p>
            <p>${data[0].population} habitants</p> 
        */}
        result.innerHTML = "";
        result.appendChild(Box);

        populateTownSelect(data[0].codesPostaux);
      } else {
        result.innerHTML = "Aucune commune trouvée pour ce code postal.";
        townSelect.style.display = "none";
        townInfo.style.display = "none";
      }
    })
    .catch((error) => {
      console.error(error);
      result.innerHTML = "Une erreur s'est produite lors de la requête.";
      townSelect.style.display = "none";
      townInfo.style.display = "none";
    });
}

function populateTownSelect(codesPostaux) {
  townSelect.innerHTML = `
    <option value="">-- Sélectionnez une ville --</option>
    ${codesPostaux
      .map((codePostal) => `<option value="${codePostal}">${codePostal}</option>`)
      .join("")}
  `;
  townSelect.style.display = "block";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchCommuneByCodePostal(codePostalInput.value);
  townInfo.style.display = "none";
  townSelect.style.display = "none";
});

townSelect.addEventListener("change", (event) => {
  const codePostal = event.target.value;
  const apiUrl = `https://geo.api.gouv.fr/communes?codePostal=${codePostal}&fields=nom,code,codesPostaux,siren,codeEpci,codeDepartement,codeRegion,region,population&format=json&geometry=centre`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
        document.querySelector(".result").innerHTML = ""
        populationInfo.innerHTML = data[0].population;
        populationInfo.innerHTML +=  " de  "+" ( " + data[0].nom +" ) <br>";
        populationInfo.innerHTML +=data[0].region.nom;
      townInfo.style.display = "block";
    })
    .catch((error) => {
      console.error(error);
      result.innerHTML = "Une erreur s'est produite lors de la requête.";
      townSelect.style.display = "none";
      townInfo.style.display = "none";
    });
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchCommuneByCodePostal(codePostalInput.value);
});
codePostalInput.addEventListener("focusout", () => {
  searchCommuneByCodePostal(codePostalInput.value);
});



