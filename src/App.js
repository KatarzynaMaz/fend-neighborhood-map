import React, { Component } from 'react';
import Filter from './Filter'
import axios from 'axios'
import ErrorBoundary from './ErrorBoundary';


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
    map: ''
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
              venues: response.data.response.groups[0].items}, this.renderMap())
          })
          .catch(error => {
            console.log('ERROR' + error)
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
      
      //Display markers
      this.state.venues.filter(venue => venue.name.toLowerCase().includes(this.state.query.toLowerCase()))
        .forEach (venue => {

        let contentString = `
        <div class = 'venue-info'>
          <h3>${venue.name}</h3>
          <p>Address: <a href="https://maps.google.com/?q=${venue.address}">${venue.address}</a></p>
          </div>`

        //create a marker for each venue on the map
        let marker = new window.google.maps.Marker({
          position: venue.loc,
          map: map,
          title:venue.name,
          animation: window.google.maps.Animation.BOUNCE
        });
        markers.push(marker);
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
    this.setState({map,markers,infowindow,contents}); 
  }
  
  handleFilter(query){
    //setting visibility of markers
    this.setState({query});
    this.state.markers.map(marker => marker.setVisible(true));
  
  //if we have a query, filter venues
  if(query){
    const filtered = this.props.venues.filter(venue =>
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
  render() {
    const {venues,query,markers,infowindow,contents, filtered,hideMarkers,map} = this.state;
    
    console.log(query)
    return (
      <main className = "app-container"> 
        <header className ='header'>
          <input type = 'text' placeholder = 'filtered-venues' className='search'
          onChange = {event => this.handleFilter(event.target.value)} value='query'/>
          <h1 className = "title"> Restaurants in Ithaca, NY</h1>
        </header>
        <ErrorBoundary>
        <Filter query={query} venues= {venues} map = {map} markers={markers} contents = {contents}
          infowindow={infowindow} filtered={filtered} hideMarkers={hideMarkers}/>
        </ErrorBoundary>
       <div id='map' role='application' aria-label='map'></div>
       
      </main>
      );
  }
}


function loadScript(url){
  let index = window.document.getElementsByTagName('script')[0]
  let script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.differ = true
  index.parentNode.insertBefore(script,index)
}


export default App;
