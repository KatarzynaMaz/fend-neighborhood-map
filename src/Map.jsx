import React, { Component } from 'react';


class Map extends Component {
    constructor(props){
        super(props)

        this.map;
        this.markers = [];
    }
    componentDidMount = () => {
        this.renderMap();
    }
    renderMap = () => {
        loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAElGHukbd2Mb_rerPu-t6g2lvbkn77HYs&callback=initMap')
        window.initMap = this.initMap
      }

      addMarkers =(map) => {
        let venues = this.props.venues
  //Display markers
  venues.map(myVenue => {

    let contentString = `${myVenue.venue.name}`

    //create a marker
    
    let marker = new window.google.maps.Marker({
      position: {lat: myVenue.venue.location.lat, 
                lng: myVenue.venue.location.lng},
      map: map,
    });
        this.markers.push(marker);
    
        //click on a chosen marker
        marker.addListener('click', function() {
            let infowindow = new window.google.maps.InfoWindow();

        //the content needs to be changed
        infowindow.setContent(contentString)

        //open infowindow
        infowindow.open(map, marker);
    });
})   
}

    clearMarkers =() => {
    this.markers.forEach(marker => marker.setMap(null));
    }
    initMap = () => {
        //create a map
        let map = new window.google.maps.Map(document.getElementById('map'), {
        center: {lat: 42.443, lng: -76.501},
        zoom: 14 
    });
    }

    render () {
        this.clearMarkers();
        this.addMarkers(this.map);
        
        return (
            <div>
                <div id= 'map'></div>
            </div>
        )
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
  
  export default Map;