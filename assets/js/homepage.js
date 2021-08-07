var apiKey = "5ae2e3f221c38a28845f05b69ebaab9667831cd14bd320fe563efa88";
var apiKey2 = "5ae2e3f221c38a28845f05b6a749653163ddad9adc28cbe035c9fa5e";
var placesArray = [];
var cardContainer = document.getElementById("attractions");
var searchEl = document.getElementById("search-element");
var sectionCards = document.getElementById("attractions");
var welcome = document.getElementById("welcome");
var searchHeading = document.getElementById("search-heading");
var waitText = document.getElementById("wait");
const city = document.getElementById("enter-city");
const search = document.getElementById("search-button");
const clearSearch = document.getElementById("clear-history");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
const history = document.getElementById("history");
var sectionLabel = document.getElementById("text-label");
var myList = document.getElementById("label");
const save = document.getElementsByClassName("s-card");
var saveHistory = JSON.parse(localStorage.getItem("save")) || [];
const sHistory = document.getElementById("save-id");
var deleteCard = document.getElementsByClassName("d-btn");


var searchSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from search
    var cityName = city.value.trim();

    if (cityName) {
        getPlaces(cityName);
        //searchHistory.push(cityName)
        //localStorage.setItem('search', JSON.stringify(searchHistory));


    }
    // city.value = "";
};

var getPlaces = function (searchCity) {
    // clear array
    placesArray = [];

    // display search heading and hide welcome message
    welcome.classList = "hidden";
    searchHeading.classList = "title is-3";
    searchHeading.textContent = "showing results for " + searchCity;
    waitText.removeAttribute("class", "hidden");

    // fetch the city name from search to get coordinates(fix link below to reflect)
    fetch("https://api.geoapify.com/v1/geocode/search?text=" + searchCity + "&lang=en&limit=1&type=city&apiKey=5f14cd024f004280af18302ff6db6a1f")
        .then(response => (response.json())
            // take coordinates from previous fetch data to get places array
            .then(data => {
                fetch("https://api.opentripmap.com/0.1/en/places/radius?radius=50000&lon=" + data.features[0].properties.lon + "&lat=" + data.features[0].properties.lat + "&rate=3&kinds=natural&limit=10&format=json&apikey=" + apiKey)
                    .then(response => (response.json())
                        .then(data => {
                            // for loop to push data to placesArray
                            // console.log(data)
                            for (var i = 0; i < data.length; i++) {
                                // fetch call using xid for more data
                                fetch("https://api.opentripmap.com/0.1/en/places/xid/" + data[i].xid + "?apikey=" + apiKey2)
                                    // push into the array
                                    .then(response => response.json())
                                    .then(data => {
                                        console.log(data)
                                        placesArray.push(data)
                                        return placesArray;
                                    })
                            };
                            setTimeout(createCards, 1000);
                        }))
            }))
}

var createCards = function () {
    console.log("this was reached");

    // remove old results
    cardContainer.innerHTML = "";

    // remove waiting message
    waitText.classList = "hidden";

    // loop through the array and display cards
    for (var i = 0; i < placesArray.length; i++) {
        // create a column div to hold the card
        var columnDiv = document.createElement("div");
        columnDiv.classList = "column is-12-mobile is-6-tablet is-3-desktop is-3-widescreen is-3-fullhd";
        cardContainer.appendChild(columnDiv);

        // create a card to hold data
        var placeCard = document.createElement("div");
        placeCard.classList = "card card-h br-0";
        columnDiv.appendChild(placeCard);

        // create an image for each card
        var placeImage = document.createElement("figure");
        var imageData = document.createElement("img");
        placeImage.classList = "image is-4by3";
        imageData.setAttribute("id", "img");
        if (placesArray[i].preview) {
            imageData.setAttribute("src", placesArray[i].preview.source);
        } else {
            imageData.setAttribute('src', '')
        }
        imageData.setAttribute("alt", "image showing a view of " + placesArray[i].name + "");
        placeImage.appendChild(imageData);

        // create a title for each card
        var placeTitle = document.createElement("p");
        placeTitle.setAttribute("id", "p-title");
        placeTitle.classList = "title is-4 p-10";
        placeTitle.textContent = placesArray[i].name;

        // create a description for each card
        var placeText = document.createElement("p");
        placeText.setAttribute("id", "p-text");
        placeText.classList = "description ellipsis ellipsis p-10";
        placeText.textContent = placesArray[i].wikipedia_extracts.text;

        // create a card footer with save and more buttons
        var footerCard = document.createElement("div");
        var footer = document.createElement("footer");
        var saveBtn = document.createElement("button");
        var moreBtn = document.createElement("a");
        footerCard.classList = "card br-0";
        footer.classList = "card-footer";
        saveBtn.classList = "card-footer-item btn2";
        moreBtn.classList = "card-footer-item btn2";
        saveBtn.textContent = "Save";

        // Get saved value
        saveBtn.setAttribute('data-name', placesArray[i].name);
        saveBtn.setAttribute('data-img', placesArray[i].preview.source);
        saveBtn.setAttribute('data-desc', placesArray[i].wikipedia_extracts.text)
        saveBtn.setAttribute("id", "save-button");
        moreBtn.setAttribute("href", placesArray[i].wikipedia);
        moreBtn.textContent = "More";
        moreBtn.setAttribute("target", "_blank");
        footerCard.appendChild(footer);
        footer.appendChild(saveBtn);
        footer.appendChild(moreBtn);

        // append children to card
        placeCard.appendChild(placeImage);
        placeCard.appendChild(placeTitle);
        placeCard.appendChild(placeText);
        columnDiv.appendChild(footerCard);

        // onclick save, do local storage
        saveBtn.addEventListener('click', function (evt) {
            console.log('CLICKED BUTTON')
            console.log('THIS-->', evt.target.dataset.name)
            console.log('THIS-->', evt.target.dataset.img)
            console.log('THIS-->', evt.target.dataset.desc)

            const saveTerm = evt.target.dataset.name;
            //getPlaces(saveTerm);
            saveHistory.push(saveTerm);
            localStorage.setItem("save", JSON.stringify(saveHistory));
            callSaveHistory();
        })
    }

    sectionCards.classList.remove("hidden");
};


// event listeners
searchEl.addEventListener("submit", searchSubmitHandler);


// create saved place
function callSaveHistory() {
    sHistory.innerHTML = "";
    for (let i = 0; i < saveHistory.length; i++) {

        console.log("TEST CREATE SAVED CARD ");

        const saveItem = document.createElement("input");
        // Brian's 
        // create display saved cards

        saveItem.setAttribute("type", "text");
        saveItem.setAttribute("readonly", true);
        saveItem.setAttribute("class", "btn");
        saveItem.setAttribute("value", saveHistory[i]);

        // end Brian/
        sHistory.append(saveItem);
    }
}

callSaveHistory();

function deleteSave() {
    localStorage.clear();
    saveHistory = [];
}
deleteSave();

// // Clear History
// clearSearch.addEventListener("click", function () {
//     localStorage.clear();
//     searchHistory = [];
//     callSearchHistory();

// })