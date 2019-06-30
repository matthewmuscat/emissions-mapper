import React, { Component } from 'react';
import './App.css';

// Import Views:
import WorldMap from './views/worldmap/WorldMap';
import SliderComponent from './views/components/SliderComponent'

class App extends Component {
  render() {
      return (
          <div>
            <WorldMap/>
            <SliderComponent/>
          </div>
      );
  }
}
export default App;
