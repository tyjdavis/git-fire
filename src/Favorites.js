import React, { Component } from 'react';

class Favorites extends Component {


  render () {
    console.log(this.props.match.params.id)

      return (
        // <li className="section">
        //   <h5><strong>Name:</strong> {project.name}</h5>
        //   <br />
        //   <img className="responsive-img" src={project.owner.avatar_url}/>
        //   <p><strong>Description:</strong> {project.description}</p>
        //   <a href={project.html_url} target="_blank">Link to GitHub</a>
        //   <p><strong>Stars:</strong> {project.stargazers_count}</p>
        // </li>
        <div>Test</div>
      )
  }
}



export default Favorites;
