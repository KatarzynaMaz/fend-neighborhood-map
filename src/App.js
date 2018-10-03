import React, { Component } from 'react';
import './App.css';
import axios from 'axios'
import Filter from './Filter'
import Map from './Map'

class App extends Component {
  //storing places in the venues state
  state = {
    venues: [],
    filteredVenues: []
  }

  componentDidMount() {
    this.getVenues()
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

    filter = (query => {

      this.setState(state => {
        let venues=state.venues;

        if(query) {
          venues = state.venues.filter(myVenue =>
            myVenue.venue.name.toLowerCase()
            .includes(query.toLowerCase()))
        }
        return ({filteredVenues: venues});
      })
    })


  render() {
    return (
      <main> 
       <Map venues = {this.state.filteredVenues}/>
       <Filter/>
      </main>
    );
  }
}


export default App;
