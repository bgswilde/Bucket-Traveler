// KEY GLOBAL VARIABLES FOR API, DOM OBJECTS, SEARCH ARRAY
var apiKey = "5ae2e3f221c38a28845f05b69ebaab9667831cd14bd320fe563efa88";
var apiKey2 = "5ae2e3f221c38a28845f05b6a749653163ddad9adc28cbe035c9fa5e";
var placesArray = [];
var cardContainer = document.getElementById("attractions");
var bucketlistContainer = document.getElementById("saved-attractions");
var bucketlistEmptyMessage = document.getElementById("bucket-list-empty");
var searchEl = document.getElementById("search-element");
var sectionCards = document.getElementById("attractions");
var welcome = document.getElementById("welcome");
var instructions = document.getElementById("instructions");
var searchHeading = document.getElementById("search-heading");
var waitText = document.getElementById("wait");
var holdingImage = document.getElementById("holding-image");
const city = document.getElementById("enter-city");
const history = document.getElementById("history");
var sectionLabel = document.getElementById("text-label");
var myList = document.getElementById("label");
const save = document.getElementsByClassName("s-card");
var saveHistory = JSON.parse(localStorage.getItem("save")) || [];
const sHistory = document.getElementById("save-id");
var deleteCards = document.getElementById("clear-history")



// SLIDESHOW VARIABLES AND FUNCTION
var slideView = document.getElementById("gallery");
var slideDot = document.getElementById("dot-gallery");
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

var timer = setInterval(function () {
    slideIndex++;
    showSlides(slideIndex);
}, 5000);

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}



// FUNCTION TO HANDLE THE 'SUBMIT' EVENT OF SEARCHING A PLACE
var searchSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from search
    var cityName = city.value.trim();

    if (cityName) {
        getPlaces(cityName);
    }
};



// FUNCTION TO CALL APIS FOR DATA
var getPlaces = function (searchCity) {
    // clear array
    placesArray = [];

    // hide welcome message
    welcome.classList = "hidden";
    instructions.classList = "hidden";

    // display search heading with loading message
    searchHeading.classList = "title is-3";
    searchHeading.textContent = "Showing results for " + searchCity;
    waitText.removeAttribute("class", "hidden");
    
    // hide slideshow
    slideView.classList = "hidden";
    slideDot.classList = "hidden";


    // fetch the city name from search to get coordinates(fix link below to reflect)
    fetch("https://api.geoapify.com/v1/geocode/search?text=" + searchCity + "&lang=en&limit=1&type=city&apiKey=5f14cd024f004280af18302ff6db6a1f")
        .then(response => (response.json())
            // take coordinates from previous fetch data to get places array
            .then(data => {
                fetch("https://api.opentripmap.com/0.1/en/places/radius?radius=50000&lon=" + data.features[0].properties.lon + "&lat=" + data.features[0].properties.lat + "&rate=3&kinds=natural&limit=10&format=json&apikey=" + apiKey)
                    .then(response => (response.json())
                        .then(data => {
                            // for loop to push data to placesArray
                            for (var i = 0; i < data.length; i++) {
                                // fetch call using xid for more data
                                fetch("https://api.opentripmap.com/0.1/en/places/xid/" + data[i].xid + "?apikey=" + apiKey2)
                                    // push into the array
                                    .then(response => response.json())
                                    .then(data => {
                                        placesArray.push(data)
                                        return placesArray;
                                    })
                            };
                            // delay so createCards function doesn't run until the data array is completed.
                            setTimeout(createCards, 1200);
                        }))
            }))
}



// FUNCTION TO CREATE LOCATION RESULT CARDS USING ARRAY CREATED IN GETPLACES FUNCTION
var createCards = function () {
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
        placeCard.classList = "card br-0";
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
        placeTitle.classList = "title is-4 mgl p-10";
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
        saveBtn.setAttribute('data-desc', placesArray[i].wikipedia_extracts.text);
        saveBtn.setAttribute('data-link', placesArray[i].wikipedia);
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

        // onclick save, push data to local storage
        saveBtn.addEventListener('click', function (evt) {
            const saveTerm = evt.target.dataset;
            saveHistory.push(saveTerm);
            localStorage.setItem("save", JSON.stringify(saveHistory));
            addSaveItem();
        })
    }
    // make the card display visible
    sectionCards.classList.remove("hidden");
};



// FUNCTION TO CREATE CARDS TO GO INTO BUCKETLIST. USED WHEN CARD IS SAVED AND WHEN LOCAL STORAGE IS CALLED ON PAGE LOAD
var bucketCards = function (savedItemData) {
    deleteCards.classList.remove('hidden')

    // create a column div to hold the card
    var columnDiv = document.createElement("div");
    columnDiv.classList = "column is-12-mobile is-6-tablet is-3-desktop is-3-widescreen is-3-fullhd";
    bucketlistContainer.appendChild(columnDiv);

    // create a card to hold data
    var placeCard = document.createElement("div");
    placeCard.classList = "card br-0";
    columnDiv.appendChild(placeCard);

    // create an image for each card
    var placeImage = document.createElement("figure");
    var imageData = document.createElement("img");
    placeImage.classList = "image is-4by3";
    imageData.setAttribute("id", "img");
    if (savedItemData.img) {
        imageData.setAttribute("src", savedItemData.img);
    } else {
        imageData.setAttribute('src', '')
    }
    imageData.setAttribute("alt", "image showing a view of " + savedItemData.name + "");
    placeImage.appendChild(imageData);

    // create a title for each card
    var placeTitle = document.createElement("p");
    placeTitle.setAttribute("id", "p-title");
    placeTitle.classList = "title is-4 mgl p-10";
    placeTitle.textContent = savedItemData.name;

    // create a description for each card
    var placeText = document.createElement("p");
    placeText.setAttribute("id", "p-text");
    placeText.classList = "description ellipsis ellipsis p-10";
    placeText.textContent = savedItemData.desc;

    // create a card footer with delete and more buttons
    var footerCard = document.createElement("div");
    var footer = document.createElement("footer");
    // var deleteBtn = document.createElement("button");
    var moreBtn = document.createElement("a");
    footerCard.classList = "card br-0";
    footer.classList = "card-footer";
    //deleteBtn.classList = "card-footer-item btn2 d-btn";
    // deleteBtn.textContent = "Delete";
    moreBtn.classList = "card-footer-item btn2";
    moreBtn.textContent = "More";
    moreBtn.setAttribute("href", savedItemData.link);
    moreBtn.setAttribute("target", "_blank");
    footerCard.appendChild(footer);
    //footer.appendChild(deleteBtn);
    footer.appendChild(moreBtn);

    // append children to card
    placeCard.appendChild(placeImage);
    placeCard.appendChild(placeTitle);
    placeCard.appendChild(placeText);
    columnDiv.appendChild(footerCard);
};



// FUNCTION FOR CREATING A SAVE CARD IN BUCKET LIST WHEN "SAVE" IS CLICKED
function addSaveItem() {
    // remove empty Bucket List message
    bucketlistEmptyMessage.classList = "hidden";
    slideView.classList = "hidden";
    slideDot.classList = "hidden";

    // takes most recent saveHistory item to create card in bucket list
    for (let i = saveHistory.length - 1; i < saveHistory.length; i++) {
        bucketCards(saveHistory[i]);
    }
};



// FUNCTION TO CREATE CARDS FROM LOCAL STORAGE TO BUCKETLIST WHEN PAGE LOADS
function callSaveHistory() {
    // goes through the whole saved array to create cards in the bucket list
    for (let i = 0; i < saveHistory.length; i++) {
        bucketCards(saveHistory[i]);
    }

    if (saveHistory.length > 0) {
        bucketlistEmptyMessage.classList = "hidden";
        slideView.classList = "hidden";
        slideDot.classList = "hidden";
        deleteCards.classList.remove('hidden')
    }
}



// FUNCTION DO DELETE BUCKETLIST AND START OVER
deleteCards.addEventListener("click", function () {
    localStorage.clear();
    saveHistory = [];
    callSaveHistory();
    bucketlistContainer.innerHTML = "";
})



// loads the Bucket List upon page load
callSaveHistory();

// event listener
searchEl.addEventListener("submit", searchSubmitHandler);
