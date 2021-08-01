var apiKey = "5ae2e3f221c38a28845f05b69ebaab9667831cd14bd320fe563efa88";
var apiKey2 = "5ae2e3f221c38a28845f05b6a749653163ddad9adc28cbe035c9fa5e";
var placesArray = [];
var cardContainer = document.getElementById("attractions");
var search = document.getElementById("searchBtn");

var getPlaces = function() {
    // clear array
    // fetch the city name from search to get coordinates(fix link below to reflect)
    fetch("https://api.opentripmap.com/0.1/en/places/geoname?name=seattle&apikey=" + apiKey)
        .then(response => (response.json())
            // take coordinates from previous fetch data to get places array
        .then(data => {
            console.log(data)
            fetch("https://api.opentripmap.com/0.1/en/places/radius?radius=35000&lon=" + data.lon + "&lat=" + data.lat + "&rate=3&kinds=natural&limit=10&format=json&apikey=" + apiKey)
                .then(response => (response.json())
                .then(data => {
                    // for loop to push data to placesArray
                    console.log(data)
                    for (var i = 0; i < 10; i++) {
                        // fetch call using xid for more data
                        fetch("https://api.opentripmap.com/0.1/en/places/xid/" + data[i].xid + "?apikey=" + apiKey2)
                        // push into the array
                        .then(response => response.json())
                        .then(data => {
                            console.log(data)
                            placesArray.push(data)
                        })
                    }
                }))
                Promise; for (var i = 0; i < placesArray.length; i++) {
                    // create a card to hold data
                    var placeCard = document.createElement("div");
                    placeCard.classList = "card";
                    cardContainer.appendChild(placeCard);

                    // create a title for each card
                    var placeTitle = document.createElement("p");
                    placeTitle.classList = "title is-4";
                    placeTitle.textContent = placesArray[i].name;

                    // create an image for each card
                    var placeImage = document.createElement("figure");
                    placeImage.classList = "image is-4by3";
                    placeImage.innerHTML = "<img src='" + placesArray[i].image + "' alt='image showing a view of " + placesArray[i].name + "'>";

                    // create a description for each card
                    var placeText = document.createElement("p");
                    placeText.classList = "description";
                    placeText.textContent = placesArray[i].wikipedia_extracts.text;
                    
                    // create a save button 
                    var saveBtn = document.createElement("button");
                    saveBtn.classList = "saveBtn";

                    // create a more details button
                    var moreBtn = document.createElement("button");
                    moreBtn.classList = "moreBtn";

                    // append children to card
                    placeCard.appendChild(placeTitle, placeImage, placeText, saveBtn, moreBtn);
                }
        }))
}

// event listeners
search.addEventListener("submit", getPlaces);