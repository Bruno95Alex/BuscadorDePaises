    async function loadCountryDetails() {
        // Capturar o código do país da URL
        let params = new URLSearchParams(window.location.search); //pega a parte da URL que contém os parâmetros (o que vem depois do ?)
        let countryCode = params.get("code"); //Pegar o valor do parametro(code)

        // Buscar os dados do país usando o código cca2 da API
        let reply = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
        let data = await reply.json();

        let country = data[0];

        // Criar o card do país
        let card = document.createElement("div");
        card.classList.add("countryDetails");

        card.innerHTML = `<div class="divFlags">
            <img width="300" height="200" src="${country.flags.png}" alt="${country.flags.alt}" />
            ${country.coatOfArms?.png ? `<img width="180" height="200" src="${country.coatOfArms.png}" alt="Brasão de ${country.name.common}"/>`: `<span>N/A</span>`}
            </div>
            <h2>${country.translations.por.official} </h2> 
            <h3>${country.name.common} (${country.translations.por.common})</h3>
            
            <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : "N/A"}</p>
            <p><strong>População:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Continente:</strong> ${country.continents}</p>
            <p><strong>Idiomas:</strong> ${country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
            <p><strong>Moeda:</strong> ${country.currencies ? Object.values(country.currencies)[0].name + 
                " (" + Object.values(country.currencies)[0].symbol + ")" : "N/A"}</p>
            <p><strong>Área geográfica:</strong> ${country.area.toLocaleString()} km² </p>
            <p><strong>Codigo FIFA:</strong> ${country.fifa ? Object.values(country.fifa).join("") : "N/A"}</p>
            <p><strong>Codigo do país:</strong> ${country.idd.root}${country.idd.suffixes[0]}</p>


            <p><strong>Google Maps:</strong><a href="${country.maps.googleMaps}" target="_blank">${country.maps.googleMaps}</p></a>
            <p><strong>Street Maps	:</strong><a href="${country.maps.openStreetMaps}" target="_blank">${country.maps.openStreetMaps}</p></a>
            
        `;

        document.querySelector(".countryDetails").appendChild(card);
    }

    // Chamada da função
    loadCountryDetails();
