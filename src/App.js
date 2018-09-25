import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.renderMap()
  }

  renderMap = () => {
      loadScript('https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap')
      window.initMap = this.initMap

  }

  initMap = () => {
   let map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.085, lng: -76.053},
      zoom: 8    });
  }


  render() {
    return (
      <main> 
       <div id='map'></div>
      </main>
    );
  }
}

/*  <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script> */
function loadScript(url){
  let index =
  window.document.getElementByTagName('script')[0]
  let script = window.document.createElement('script')
  script.src = url
  script.async = true
  script.differ = true
  index.parentNode.index.insertBefore(script,index)
}

/*<script src = "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
async differ></script>*/

export default App;
