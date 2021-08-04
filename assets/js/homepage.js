var apiKey = "5ae2e3f221c38a28845f05b69ebaab9667831cd14bd320fe563efa88";
var apiKey2 = "5ae2e3f221c38a28845f05b6a749653163ddad9adc28cbe035c9fa5e";
var placesArray = [];
var cardContainer = document.getElementById("attractions");
var searchEl = document.getElementById("search-element");
var sectionCards = document.getElementById("attractions");
const city = document.getElementById("enter-city");
const save = document.getElementById("save-place");
let saveHistory = JSON.parse(localStorage.getItem("save")) || [];
const history = document.getElementById("history");
const clearSave = document.getElementById("delete-item");
const pageLength = 5;
let offset = 0;

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
                            setTimeout(createCards, 2200);
                        }))
            }))

    var createCards = function () {
        cardContainer.innerHTML = "";
        console.log("this was reached");
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
            imageData.setAttribute("src", placesArray[i].preview.source);
            imageData.setAttribute("alt", "image showing a view of " + placesArray[i].name + "");
            placeImage.appendChild(imageData);

            // create a title for each card
            var placeTitle = document.createElement("p");
            placeTitle.classList = "title is-4 p-10";
            placeTitle.textContent = placesArray[i].name;

            // create a description for each card
            var placeText = document.createElement("p");
            placeText.classList = "description ellipsis ellipsis p-10";
            placeText.textContent = placesArray[i].wikipedia_extracts.text;

            // create a card footer with save and more buttons
            var footerCard = document.createElement("div");
            var footer = document.createElement("footer");
            var saveBtn = document.createElement("a");
            var moreBtn = document.createElement("a");
            footerCard.classList = "card br-0";
            footer.classList = "card-footer";
            saveBtn.classList = "card-footer-item";
            moreBtn.classList = "card-footer-item";
            saveBtn.textContent = "Save";
            saveBtn.setAttribute("href", "#");
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

        sectionCards.classList.remove("hidded");

    };

    // Get history
    save.addEventListener("click", function () {
        const saveTerm = city.value;
        getPlaces(saveTerm);
        saveHistory.push(saveTerm);
        localStorage.setItem("search", JSON.stringify(saveHistory));
        callSaveHistory();
    })

    // Clear History
    clearSave.addEventListener("click", function () {
        localStorage.clear();
        searchHistory = [];
        callSaveHistory();
    })

    function callSaveHistory() {
        history.innerHTML = "";
        for (let i = 0; i < saveHistory.length; i++) {
            const saveItem = document.createElement("input");
            saveItem.setAttribute("type", "text");
            saveItem.setAttribute("readonly", true);
            saveItem.setAttribute("class", "");
            saveItem.setAttribute("value", searchHistory[i]);
            saveItem.addEventListener("click", function () {
                getPlaces(saveItem.value);
            })
            history.append(saveItem);
        }
    }

    callSaveHistory();
    if (saveHistory.length > 0) {
        getPlaces(saveHistory[saveHistory.length - 1]);
    }

    /*document.getElementById("next_button").addEventListener("click", function () {
            offset += pageLength;
            loadList();
        });*/
}

// event listeners
searchEl.addEventListener("submit", searchSubmitHandler);

// testing new push develop