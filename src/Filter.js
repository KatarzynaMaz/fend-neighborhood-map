import React, {Component} from 'react';

class Filter extends Component {

    handleClicks(venue) {
        const {infowindow, map, contents, markers} = this.props;
        // filter the markers that match the specific location name then onClick show info window
        markers.filter(marker => marker.title === venue.name).forEach(marker => {
            infowindow.setContent(String(contents.filter(content => String(content).slice(10).includes(venue.name))));
            infowindow.open(map, marker);
            // set  animation for the marker that is clicked
            marker.setAnimation(window.google.maps.Animation.BOUNCE)
                setTimeout(function() {
                marker.setAnimation(null)
            }, 500)
        });
        //invoking toggleList function
        this.props.toggleList();
    }
   
    render() {
        console.log(this.props.venues);
        console.log(this.props.query)
    let venues = this.props.venues;
    let query = this.props.query;
    return (
            <div  className = {`restaurant-list ${this.props.listClass}`}  aria-label='Restaurants in Ithaca, NY'  >
                <ul>           
                    {venues.filter(venue=>
                        venue.name.toLowerCase().includes(query.toLowerCase())).map((venue, index) => {
                        return <li className="list-item" aria-labelledby = 'restaruant name'key={index} onClick={this.handleClicks.bind(this, venue)} tabIndex={0}>{venue.name}</li>})
                    }                   
                </ul>
            </div>
     )
    }
}

export default Filter;