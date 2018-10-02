import React, {Component} from 'react';
import ErrorBoundary from './ErrorBoundary'

class Filter extends Component {


    handleClicks(venue) {
        const {infowindow, map, contents, markers} = this.props;
        // filter the markers that match the specific location name then onClick show info window
        markers.filter(marker => marker.title === venue.name).forEach(marker => {
            infowindow.setContent(String(contents.filter(content => String(content).slice(10).includes(venue.name))));
            infowindow.open(map, marker);
            // set bounce animation for the marker that is clicked
            marker.setAnimation(window.google.maps.Animation.BOUNCE)
            setTimeout(function() {
                marker.setAnimation(null)
            }, 500)
        });
    }
   
    render() {
        const {venues,query} = this.props;
        return (
            <div className="content" aria-label="Restaurants in Ithaca, NY">
                <ul>
                    <ErrorBoundary>
                    {venues.filter(venue=> venue.name.toLowerCase().includes(query.toLowerCase())).map((venue, index) => {
                            return <li className="list-item" key={index} onClick={this.handleClicks.bind(this, venue)} tabIndex={1}>{venue.name}</li>})
                    }
                    </ErrorBoundary>
                </ul>
            </div>
        )
    }
}

export default Filter;