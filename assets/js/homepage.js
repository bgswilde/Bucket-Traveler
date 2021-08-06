
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
let searchHistory = JSON.parse(localStorage.getItem("search"));
const history = document.getElementById("history");
var sectionLabel = document.getElementById("text-label");
var myList = document.getElementById("label");
var deleteList = document.getElementById("dlist");

var searchSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from search
    var cityName = city.value.trim();

    if (cityName) {
        getPlaces(cityName);
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
    myList.textContent = "My Saved Bucket Traveller List";

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
            columnDiv.classList = "column is-full-mobile is-one-quarters-tablet is-one-quarter-desktop is-one-fourth-widescreen is-one-fourth-fullhd";
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
            imageData.setAttribute("src", placesArray[i].preview.source);
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
            saveBtn.setAttribute("id", "save-button");
            //saveBtn.setAttribute("href", "#");
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
        }

        sectionCards.classList.remove("hidden");
        myList.classList.remove("hidden");
    };
}


// Get history
search.addEventListener("click", function () {
    const searchTerm = city.value;
    getPlaces(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    callSearchHistory();
})

// Clear History
clearSearch.addEventListener("click", function () {
    localStorage.clear();
    searchHistory = [];
    callSearchHistory();

})

function callSearchHistory() {
    history.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
        const historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("class", "btn");
        historyItem.setAttribute("value", searchHistory[i]);
        historyItem.addEventListener("click", function () {
            getPlaces(historyItem.value);
        })
        history.append(historyItem);
    }
}

callSearchHistory();
if (searchHistory.length > 0) {
    getPlaces(searchHistory[searchHistory.length - 1]);
}