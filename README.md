# Bucket Traveler
>  deployed application link: https://bgswilde.github.io/Bucket-Traveler/

## Description
---
The purpose of Bucket Traveler is to make it easier for users to find and save a bucket list of nature based travel destinations.  When searching a city name, users will be able to find different popular nature locations within 50km of that city center and create their own “bucket list” of events.

Nature spots can be hard to find, and it is often hard to remember and research all the different places you do find. Bucket Traveler is designed make the process more efficient.

![Project Demo](./assets/images/demo.gif)

---
## Table of Contents
---
- [Top of Page](#bucket-traveler)
- [Description](#description)
- [User Story](#user-story)
- [Future Enhancements](#future-enhacements)
- [Technologies](#technologies)
- [Usage](#usage)
- [Installation](#installation)
- [Credits](#credits)
- [License](#license)
- [Author Info](#author-info)


### User Story
---
As a USER I want to search for vacation locations and find local nature spots to visit while I am there.

Acceptance Criteria:

- When I enter a location into a search bar and click on the search icon to submit,

- Then the application will return up to 10 cards with a name of an attraction, image and a more button to get more information  

- So that I can build my dream bucket list of attractions to visit.

- Given that I want to save my selections,

- When I hit the save button on an attraction,

- Then it will save a list at the bottom for me to refer back to.

- When I type in a new location, then the cards on the screen will be replaced with new cards from the newly searched location.

[Back To The Top](#bucket-traveler)
---

### Future Enhancements
---
Future Enhancements:

- Add flight and hotel capability 

- Add log in capability so that the saved list can be shared across devices.

- Return more results in search and add a next button to display them.



## Technologies
---
- HTML
- CSS
- Bulma
- JavaScript
- OpenTripMap API
- Geoapify API

[Back To The Top](#bucket-traveler)

---

## Credits

---
This project was completed in a team environment with the help of Derimar Gray, Jodi Jackson, and Ella Haden. I, Brian Wilde, had the primary role of handling the javascript functionality of calling the APIs used, getting data and dynamically creating cards on the page to display the nature locations searched, in addition to contributing to the concept of the application and input in the design of the page. The GitHub accounts of the other team members are listed at the bottom of the page.

API data used was courtesy of 
- Geoapify (taking a city name and converting it to longitude and latitude coordinates, https://www.geoapify.com/places-api)
- OpenTripMap (getting nature location images and details, https://opentripmap.io/)


## Usage

---

To use Bucket Traveler, simply visit the deployed application link (https://bgswilde.github.io/Bucket-Traveler/) and type the name of a city in the search bar. If the city has results, they will display in main page. When you see an item you would like to save, click save and that item will appear in your Bucket List at the bottom of the page, persisting via localStorage. If you would like to start your bucket list over, you can click the delete list button at the Bucket List, or clear out your localStorage through dev tools.

If you would like to use this code to have stored on your computer and customize some searches through the opentripmap api, follow the installation instructions below.

## Installation

No installation required for using this application, but you can make a copy of this repo on your machine to customize the code. You can find different API endpoints using the opentripmap api documentation here: https://opentripmap.io/docs. Use those endpoint queries in the fetch api call in the homepage.js file, line 102.


[Back To The Top](#bucket-traveler)

---

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
MIT License

Copyright (c) 2021 Brian Wilde,  Derimar Gray, Jodi Jackson, Ella haden.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[Back To The Top](#bucket-traveler)

---

## Questions
If you have any questions about the usage of this application, please direct them to Brian Wilde at bgswilde@gmail.com.

[Back To The Top](#bucket-traveler)

---
## Author Info

>Project Contributors

- [Brian Wilde](https://github.com/bgswilde)
- 
- [Derimar Gray](https://github.com/Derimarg)

- [Jodi Jackson](https://github.com/Jodi-Jackson)

- [Ella Haden](https://github.com/hadenella)

[Back To The Top](#bucket-traveler)
