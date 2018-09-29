import React, {Component} from 'react'
import axios from 'axios'


class Filter extends Component {
    constructor () {
        super();
        this.state = {venues:[]}
    }

    componentDidMount(){
        this.getVenues();
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
        venues: response.data.response.groups[0].items})
    })
    .catch(error => {
        console.log('ERROR' + error)
    })
}    

    filter(e){
        this.setState({filter:e.target.value})
    }
    render (){
        let venues = this.state.venues //.slice(0,10);
   
        if(this.state.filter){
            venues=venues.filter(myVenue=>
                myVenue.venue.name.toLowerCase()
                .includes(this.state.filter.toLowerCase()))
        }
        return(
            <div className='side-container'>
                <input className='input-container' type='text'
                     onChange={this.filter.bind(this)}/>
                <div>
                    {venues.map(myVenue => 
                        <p className='venue-list' key={myVenue.venue.id}>
                             {myVenue.venue.name}
                             
                        </p>)}
                </div>    
        
            </div>
            )
            }
        }


export default Filter;