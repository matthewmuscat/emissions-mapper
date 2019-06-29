import React, { Component } from 'react';
import './App.css';

// Import Views:
import Probabilities from './views/probabilities/index.jsx';

class App extends Component {
  render() {
      return (
          <div>
            <Probabilities />
          </div>
      );
  }
}
export default App;
