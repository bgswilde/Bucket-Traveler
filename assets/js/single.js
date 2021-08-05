const search = document.getElementById("search-button");
const clearSearch = document.getElementById("clear-history");
let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
const history = document.getElementById("history");
 
 
 // Get history
 search.addEventListener("click", function () {
    const searchTerm = city.value;
    getPlaces(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    callSearchHistory();
})

// Clear History
/*clearSearch.addEventListener("click", function () {
    localStorage.clear();
    searchHistory = [];
    callSearchHistory();
})*/

function callSearchHistory() {
    history.innerHTML = "";
    for (let i = 0; i < searchHistory.length; i++) {
        const label = document.createElement("h2")
        const historyItem = document.createElement("input");
        historyItem.setAttribute("type", "text");
        historyItem.setAttribute("readonly", true);
        historyItem.setAttribute("class", "input-group mb-3 p-2 cityLabel border-0 rounded d-block text-center");
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