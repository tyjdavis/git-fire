import React, { Component } from 'react';
import $ from 'jquery';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'



class Favorites2 extends Component {


  render () {
      const project = this.props.project;
      const id = this.props.project.id;
      console.log(this.props.project);
      return (
        <li className="">
          <Link to={`${project.id}`}>{project.name}</Link>
        </li>
      )
    }
}



export default Favorites2;
