import React from 'react';
import './App.css';
import MapContainer from './MapContainer'
import Title from './Title'


 const App = props => { 

      return (
        <div id='container'>
          <Title/>
          <main> 
            <MapContainer
            google ={props.google}
            />
          </main>

        </div>
      
    );
  }


export default App;
