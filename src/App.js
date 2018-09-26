import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  componentDidMount() {
    this.renderMap()
  }

  renderMap = () => {
      loadScript('https://maps.googleapis.com/maps/api/js?key=AIzaSyAElGHukbd2Mb_rerPu-t6g2lvbkn77HYs&callback=initMap')
      window.initMap = this.initMap

  }

  initMap = () => {
   let map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 42.085, lng: -76.053},
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
