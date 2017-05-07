import React, { Component } from 'react';
import Details from './Details';
import Home from './Home'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {



  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Home}/>
          <Route exact path="/:id" component={Details}/>
        </div>
      </Router>
    );
  }
}

export default App;
