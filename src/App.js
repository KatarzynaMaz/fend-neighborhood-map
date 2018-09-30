import React from 'react';
import './App.css';
import MapContainer from './MapContainer'


 const App = props => { 

      return (
      <main> 
       <MapContainer
       google ={props.google}
       />
      </main>
    );
  }


export default App;
