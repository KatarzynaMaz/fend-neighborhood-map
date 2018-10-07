# The Neighborhood Map Project

This is the final project the FEND track. In this projects the student were supposed to create a React app
that allows a user to seach for venues in a certain location, in my instance for restaurants in Ithaca, NY. No starter code was provided for the project. The project was built with [Create React App](https://github.com/facebookincubator/create-react-app) and it utilizes the `Google Map API` and the location-based
service `Foursquare API` and it required setting up accounts with both Google and Foursqure and acquaring the key.
The application was built with responsivness and accessibility in mind.

I did not set up billing with Google, so the map dispays watermarks "For development purposes only." This doesn't 
impair map functionality. 


## To run

* Clone or download the project from this [repo] (https://github.com/KatarzynaMaz/fend-neighborhood-map/tree/udacity-map-project)  
* install all project dependencies with `npm install`
* start development server with `npm start`  
* the project is served on `localhost:3000` by default
  
## To use

The app will load a map of Ithaca, NY with 30 markers on the map related to local restaurants. When you click on a marker, a window with information about that specific location will open. Clicking elsewhere on a map will close the window. The app can also display the list of all restaurants which can be accessed by clicking `Restaurant List` button. I decided to go with the button to display the list instead of having the list being displayed as a part of the viewport because it was hard to see the list on a small screen. So, when the Restaurant List button is clicked, the list of restaurants will show. Clicking on an item from the list will open information window about the location and will make the corresponding marker to bounce. Clicking again the `Restaurant List` button will hide the list. The app has also a seach field, which allows to look for a specific restaurant. When you a query is entered in the search field, the markers on the map will be filtered and only corresponding marker will remain on the map. The list of restaurats will be filtered as well (remember to click the `Restaurant List` button in order to see the list of restaurats displayed). Clearing the query, brings back all the markers and restores the list as well. 

## Service Worker

Service Worker  for this project will only cache the side when in production mode. To load 
the app in production mode:
`npm run build`
and then
`serve -s build`

## Dependencies
* [Create-React-app](https://github.com/facebook/create-react-app)
* [React](https://reactjs.org/)
* [Axios](https://www.npmjs.com/package/axios)
* [Google Maps API](https://developers.google.com/maps/documentation/javascript/get-api-key)
* [Foursquare API](https://developer.foursquare.com/)


## Credits
* A walkthrough by [Elharony](https://www.youtube.com/channel/UCcWSbBe_s-T_gZRnqFbtyIA)
* A walkthrough by 
    [Rayn Waite](https://www.youtube.com/watch?v=LvQe7xrUh7I&index=6&list=PLKC17wty6rS1XVZbRlWjYU0WVsIoJyO3s&t=0s)
* Slack discussion
* Knowledge posts
* A few 1:1 sessions with other students and a couple of webinars about React 
  by [Rodrick Bloomfield](https://drive.google.com/drive/folders/1OEk5EpqhPqvpBBsHP0mrQ_DYMPMvt8bd?ogsrc=32)

## Contributing
This is a personal project for the Udacity course and pull requests will not be accepted. 
