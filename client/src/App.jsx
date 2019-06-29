import React, { Component } from 'react';
import './App.css';

// Import Views:
import WorldMap from './views/worldmap/index';

class App extends Component {
  render() {
      return (
          <div>
            <WorldMap/>
          </div>
      );
  }
}
export default App;
