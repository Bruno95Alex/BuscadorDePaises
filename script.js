let allCountries = [];

async function searchCountries(value) {
    let reply = await fetch("https://restcountries.com/v3.1/" + value);
    let data = await reply.json();

    allCountries = data;

    renderCountries(allCountries);
}

function renderCountries(allCountries) {

    document.querySelector(".allCountries").innerHTML = "";

    document.querySelector("#qt").innerHTML = allCountries.length;

    for(let country of allCountries){
      
        let card = document.createElement("div");
        card.classList.add("country");

        card.innerHTML = `
        <a href="secondaryPage.html?code=${country.cca2}">
            <img
            width="200" height="150"
            src="${country.flags.png}"
            alt="${country.flags.alt}"
            /> <br>
            <span>${country.name.common}</span>
          </a>
        `;

        document.querySelector(".allCountries").appendChild(card);
    }
}

function filteCountries(input) {
    console.log(input.value);
    
    searchCountries(input.value);
}

function localSearch(input) {
    const searchedCountries = [];
    const name = input.value.toLowerCase();

    for (let country of allCountries){
        let c = country.translations.por.common.toLowerCase();
        if(c.startsWith(name)) {
            searchedCountries.push(country);
        }
    }
    
    renderCountries(searchedCountries);

}
 searchCountries("all");