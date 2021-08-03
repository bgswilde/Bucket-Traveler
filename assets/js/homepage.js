var apiKey = "5ae2e3f221c38a28845f05b69ebaab9667831cd14bd320fe563efa88";
var apiKey2 = "5ae2e3f221c38a28845f05b6a749653163ddad9adc28cbe035c9fa5e";
var placesArray = [];
var cardContainer = document.getElementById("attractions");
var searchEl = document.getElementById("search-element");
var city = document.getElementById("enter-city");
let searchHistory = JSON.parse(localStorage.getItem("searchBtn")) || [];

var searchSubmitHandler = function(event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from search
    var cityName = city.value.trim();

    if (cityName) {
        getPlaces(cityName);

    } else {
        alert("Search invalid. Check your spelling, and avoid small or fictional cities");
    }
};

var getPlaces = function(searchCity) {
    // clear array
    placesArray = [];
    // fetch the city name from search to get coordinates(fix link below to reflect)
    fetch("https://api.geoapify.com/v1/geocode/search?text=" + searchCity + "&lang=en&limit=1&type=city&apiKey=5f14cd024f004280af18302ff6db6a1f")
        .then(response => (response.json())
            // take coordinates from previous fetch data to get places array
        .then(data => {
            fetch("https://api.opentripmap.com/0.1/en/places/radius?radius=35000&lon=" + data.features[0].properties.lon + "&lat=" + data.features[0].properties.lat + "&rate=3&kinds=natural&limit=10&format=json&apikey=" + apiKey)
                .then(response => (response.json())
                .then(data => {
                    // for loop to push data to placesArray
                    // console.log(data)
                    for (var i = 0; i < 10; i++) {
                        // fetch call using xid for more data
                        fetch("https://api.opentripmap.com/0.1/en/places/xid/" + data[i].xid + "?apikey=" + apiKey2)
                        // push into the array
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            placesArray.push(data)
                            return;
                        })
                    };
                    createCards()
                }))
                
        }))

var createCards = function(placesArray) {
    console.log("this was reached");
    for (var i = 0; i < placesArray.length; i++) {
        // create a column div to hold the card
        var columnDiv = document.createElement("div");
        columnDiv.classList = "column is-one-fifth";
        cardContainer.appendChild(columnDiv);

        // create a card to hold data
        var placeCard = document.createElement("div");
        placeCard.classList = "card";
        columnDiv.appendChild(placeCard);

        // create a title for each card
        var placeTitle = document.createElement("p");
        placeTitle.classList = "title is-4";
        placeTitle.textContent = placesArray[i].name;

        // create an image for each card
        var placeImage = document.createElement("figure");
        var imageData = document.createElement("img");
        placeImage.classList = "image is-4by3";
        imageData.setAttribute("src", "'" + placesArray[i].preview.source + "'");
        imageData.setAttribute("alt", "‘image showing a view of " + placesArray[i].name + "'");
        placeImage.appendChild(imageData);

        // create a description for each card
        var placeText = document.createElement("p");
        placeText.classList = "description";
        placeText.textContent = placesArray[i].wikipedia_extracts.text;
        
        // create a card footer with save and more buttons
        var footer = document.createElement("footer");
        var saveBtn = document.createElement("a");
        var moreBtn = document.createElement("a");
        footer.classList = "card-footer";
        saveBtn.classList = "card-footer-item";
        moreBtn.classList = "card-footer-item";
        saveBtn.setAttribute("href", "#");
        moreBtn.setAttribute("href", "#");
        footer.appendChild(saveBtn);
        footer.appendChild(moreBtn);


        // append children to card
        placeCard.appendChild(placeTitle); 
        placeCard.appendChild(placeImage);
        placeCard.appendChild(placeText);
        placeCard.appendChild(footer);
      
    }
};

        

        // //Get history
        // search.addEventListener("click", function () {
        //     const searchTerm = city.value;
        //     getPlaces(searchTerm);
        //     searchHistory.push(searchTerm);
        //     localStorage.setItem("searchBtn", JSON.stringify(searchHistory));
        // })

        // if (searchHistory.length > 0) {
        //     getPlaces(searchHistory[searchHistory.length - 1]);
        // }
}

// getPlaces();
// event listeners
searchEl.addEventListener("submit", searchSubmitHandler);