var overzichtScherm = document.getElementById("overzicht");
var winkeltjeScherm = document.getElementById("winkelmandje");
var switchButton = document.getElementById("switchButton");

var priceFilterButton = document.getElementById("priceFilterButton");
var priceFilterInput = document.getElementById("priceFilterInput");

var ratingFilterButton = document.getElementById("ratingFilterButton")
var ratingFilterInput = document.getElementById("ratingFilterInput");


var genreFilter = document.getElementById('genreFilter');


var winkelmand = [];

console.log(games);

renderGames(games);

switchButton.addEventListener("click", switchScreens);
priceFilterButton.addEventListener("click", filterPrice);
ratingFilterButton.addEventListener("click", filterRating)
console.log(overzichtScherm, winkeltjeScherm);
winkeltjeScherm.style.display = "none";
genreFilter.addEventListener('change', filterGamesByGenre);




function switchScreens() {
    if (overzichtScherm.style.display == "none") {
        overzichtScherm.style.display = "block";
        winkeltjeScherm.style.display = "none";
    }
    else {
        overzichtScherm.style.display = "none";
        winkeltjeScherm.style.display = "block";
        renderWinkelmandjeContent();
    }


}

function addToCart() {
    //check als het in het lijst al zit
    var foundIndex = winkelmand.findIndex(wantGame => wantGame.name === this.dataset.name);
    if (foundIndex > -1) {
        //remove
        winkelmand.splice(foundIndex, 1);
    }
    else {
        winkelmand.push({ name: this.dataset.name, price: this.dataset.price })
    }
    //push alleen als het niet in de llijst voorkomt
    //remove als het in de lijst zit

}

function renderWinkelmandjeContent() {

    // clear de inhoud
    winkeltjeScherm.innerHTML = "<h1>Dit is het scherm voor het winkelmandje</h1>";


    var totalPrice = 0;
    var winkelmandList = document.createElement("ul");
    // landa notatie
    winkelmand.forEach((winkelmandItem) => {
        var winkelmandElem = document.createElement("li");
        // create list item (LI)
        winkelmandElem.innerText = winkelmandItem.name + " - " + winkelmandItem.price;
        winkelmandList.appendChild(winkelmandElem);

        totalPrice += parseFloat(winkelmandItem.price);

    });
    winkeltjeScherm.appendChild(winkelmandList);

    var prijsElem = document.createElement("p");
    prijsElem.innerText = totalPrice
    winkeltjeScherm.appendChild(prijsElem);


}

function filterPrice() {
    var maxPrice = parseFloat(priceFilterInput.value);
    var filteredList = games.filter(game => parseFloat(game.price) < maxPrice);
    // console.log(filteredList)
    renderGames(filteredList);
}

function filterRating() {
    var maxRating = parseFloat(ratingFilterInput.value);
    var filteredRating = games.filter(game => parseFloat(game.rating) === maxRating)

    renderGames(filteredRating);
}

function filterGamesByGenre() {
    var selectedGenre = genreFilter.value;
    var filteredGames = games.filter(game => game.genre === selectedGenre);
    console.log(filteredGames);

    renderGames(filteredGames);
}

function renderGames(gamesToRender) {
    overzichtScherm.innerHTML = "<h1>Dit is het scherm voor het winkelmandje</h1>";
    gamesToRender.forEach((game) => {
        // stap 1 maak een nieuw element
        var gameBox = document.createElement("div");
        gameBox.classList.add("gameBoxStyle");


        var titelElem = document.createElement("p");
        var selectGameButton = document.createElement("input");
        var ratingElem = document.createElement("p");

        titelElem.classList.add("Titel")

        selectGameButton.type = "checkbox";
        // stap 2 zet de titel in het element
        titelElem.innerText = game.title;
        gameBox.innerText = game.price;
        ratingElem.innerText = game.rating;

        selectGameButton.dataset.price = game.price;
        selectGameButton.dataset.name = game.title;
        selectGameButton.addEventListener("click", addToCart);

        // stap 3 zet het hele element op het scherm
        gameBox.appendChild(selectGameButton);
        gameBox.appendChild(titelElem);
        gameBox.appendChild(ratingElem);
        overzichtScherm.appendChild(gameBox);

    });
}