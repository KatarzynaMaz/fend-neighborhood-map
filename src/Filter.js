import React, {Component} from 'react'
import axios from 'axios'


class Filter extends Component {
    constructor (props) {
        super(props)
        this.state ={
            filter:''
        }
    }

   
    filter(e){
        this.setState({filter:e.target.value})
        this.props.filter(e.target.value)
    }
    render (){
        let venues = this.state.venues.slice(0,10);
   
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