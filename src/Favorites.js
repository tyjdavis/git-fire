import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'



class Favorites extends Component {


  render () {
      const project = this.props.project;
      return (
        <li className="">
          <Link to={`${project.id}`}>{project.name}</Link>
        </li>
      )
    }
}



export default Favorites;
