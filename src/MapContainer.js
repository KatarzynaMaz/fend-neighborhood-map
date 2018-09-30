import React, {Component} from 'react'
import axios from 'axios'
import Filter from './Filter'

class MapContainer extends Component {
    state = {
        venues: [],
        venuesFiltered: []
    }


componentDidMount() {
    this.getVenues()
  }

  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAElGHukbd2Mb_rerPu-t6g2lvbkn77HYs&callback=initMap')
    window.initMap = this.initMap
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
          this.setState({
              venues: response.data.response.groups[0].items}, this.renderMap())
          })
          .catch(error => {
            console.log('ERROR' + error) 
          })
  }
  
  initMap = () => {

      //create a map
      let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.443, lng: -76.501},
      zoom: 14 });

      let infowindow = new window.google.maps.InfoWindow();
      
      //Display markers
      this.state.venues.map(myVenue => {

        let contentString = `${myVenue.venue.name}`

        //create a marker
        
        let marker = new window.google.maps.Marker({
          position: {lat: myVenue.venue.location.lat, 
                    lng: myVenue.venue.location.lng},
          map: map,
          name: myVenue.venue.name
        });
       

        //click on a chosen marker
        marker.addListener('click', function() {

        //the content needs to be changed
        infowindow.setContent(contentString)

        //open infowindow
          infowindow.open(map, marker);
        });
    })   
  }


  render() {
    return (
      <main> 
       <div id='map'></div>
       <Filter/>
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








export default MapContainer;