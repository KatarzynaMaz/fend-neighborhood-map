import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  //storing places in the allVenues state
  state = {
    allVenues: []
  }

  componentDidMount() {
    this.getVenues()
    this.renderMap()
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
              allVenues: response.data.response.groups[0].items})
          })
          .catch(error => {
            console.log('ERROR' + error)
          })
  }

  initMap = () => {
   let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.443, lng: -76.501},
      zoom: 14 });
  }


  render() {
    return (
      <main> 
       <div id='map'></div>
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
