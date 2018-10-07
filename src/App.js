import React, { Component } from 'react';
import Filter from './Filter'
import axios from 'axios'
import ErrorBoundary from './ErrorBoundary';
import './App.css'


class App extends Component {
  //setting up the state
  state = {
    venues: [],
    query: '',
    markers: [],
    infowindow:'',
    contents:[],
    filtered:[],
    hideMarkers:[],
    map: '',
    listClass: 'hidden'
  }

  componentDidMount() {
    this.getVenues();
    }

  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAElGHukbd2Mb_rerPu-t6g2lvbkn77HYs&callback=initMap')
    window.initMap = this.initMap.bind(this)
  }


getVenues =() => {
  let endPoint = 'https://api.foursquare.com/v2/venues/explore?'
  let parameters = { 
    client_id: 'II5QZS2CAQN5TUQXLAHUSHAIYNBWXHRZWIALEU0U15GISYB1',
    client_secret: 'QXMSTGVV25LKDD4KFJ3JCX51HHB3Y5CN3CBKA2O5V5WKAZBE',
    query: 'food',
    near: 'Ithaca',
    v: '20182507'
  }

  axios.get(endPoint + new URLSearchParams(parameters))
        .then(response => {
          console.log(response.data.response.groups[0].items)
        this.setState({
            venues: response.data.response.groups[0].items.map(item=>item.venue)}, 
            this.renderMap())
        })
        .catch(error => {
          console.log('ERROR' + error);
          alert('Error');
        })
        console.log('map project');
  }
 
  initMap = () => {
      let markers=[];
      let contents=[];
      //create a map
      let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.443, lng: -76.501},
      zoom: 14 });

      let infowindow = new window.google.maps.InfoWindow();
      //Defining bounds so we can later extend boundaries to the marker position
      //some of the markers were not showing on the small screen
      let bounds = new window.google.maps.LatLngBounds();
      //Display markers
      this.state.venues.filter(venue => venue.name.toLowerCase().includes(this.state.query.toLowerCase()))
        .forEach (venue => {

        let contentString = `
        <div class = 'venue-info'>
          <h3>${venue.name}</h3>
          <p>Address: <a href="https://maps.google.com/?q=${venue.location.address}">${venue.location.address}</a></p>
          </div>`

        //create a marker for each venue on the map
        let marker = new window.google.maps.Marker({
          position: {
            lat: venue.location.lat, lng:venue.location.lng
          },
          map: map,
          title:venue.name,
          animation: window.google.maps.Animation.DROP
        });
        markers.push(marker);
        //extending boundaries to the marker position
        bounds.extend(marker.position);
        contents.push(contentString);
        
        //click on chosen marker
        marker.addListener('click', function() {
              //the content needs to be changed
               infowindow.setContent(contentString)
              //open infowindow
               infowindow.open(map, marker);
               //animate marker on click
               marker.setAnimation(window.google.maps.Animation.BOUNCE)
               setTimeout(function(){
                 marker.setAnimation(null)
               },500)
               });
        map.addListener('click',function(){
          if(infowindow){
            infowindow.close();
          }
        })
    });
    map.fitBounds(bounds);
    this.setState({map,markers,infowindow,contents}); 
  }
  
  handleFilter(query){
    console.log(query);
    //setting visibility of markers
    this.setState({query});
    this.state.markers.map(marker => marker.setVisible(true));
  
  //if we have a query, filter venues
  if(query){
    const filtered = this.state.venues.filter(venue =>
        venue.name.toLowerCase().includes(this.state.query.toLowerCase()));
        this.setState({filtered});

  //hide markers that not match the query
      const hideMarkers = this.state.markers.filter(marker => filtered.every(filteredVenue => 
        filteredVenue.name !== marker.title));
        hideMarkers.forEach(marker => marker.setVisible(false));
        this.setState({hideMarkers});
    } else {
      this.state.markers.forEach(marker=>marker.setVisible(true));
    }
  }  
  //function toggleList will display the list of the restaurants when hidden and will hide 
  //it when displayed
  toggleList = () => {
       this.setState(prev => ({listClass: (prev.listClass === 'hidden')?'visible':'hidden'}));
  }

  render() {
    const {venues,query,markers,infowindow,contents, filtered,hideMarkers,map,listClass} = this.state;
    
    //console.log(listClass);
    //Setting tabIndex to 0 on a button, will allow the button to be focusable
    return (
      <main className = 'app-container'> 
        <header className ='header'>         
          <input className='search-field' aria-labelledby ='Search for a restaurant' type = 'text' placeholder = 'Search' 
          onChange = {event => this.handleFilter(event.target.value)}/>
          <h1 className = 'title'> RESTAURANTS IN ITHACA, NY</h1>
        </header>
        <button className='button' aria-labelledby ='Display restaurants' onClick = {() => this.toggleList()} tabIndex ='0'>Restaurant List</button>
        <ErrorBoundary>
        <Filter query={query} venues= {venues} map = {map} markers={markers} contents = {contents}
          infowindow={infowindow} filtered={filtered} hideMarkers={hideMarkers} listClass={listClass} toggleList = {this.toggleList}/>
        </ErrorBoundary>
       <div id='map' role='application' aria-label='map'></div>
       </main>
      );
  }
}

//onerror event is added to handle errors during loading the map
function loadScript(url){
  let index = window.document.getElementsByTagName('script')[0]
  let script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.differ = true
  index.parentNode.insertBefore(script,index)
  script.onerror = function() {
    document.write('Error loading map. Try again.')
  }
}

export default App;
