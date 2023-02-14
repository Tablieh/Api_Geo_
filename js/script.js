const result = document.querySelector(".result");

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
})