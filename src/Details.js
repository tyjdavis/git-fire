import React, { Component } from 'react';
import axios from 'axios';


class Favorites extends Component {


  render () {
    console.log(this.props.match.params.id)
    const projectId = this.props.match.params.id;
    axios.get(`https://api.github.com/repositories/${projectId}`)
    .then(response => console.log(response.data))
      return (
        <div>test</div>
        // <li className="section">
        //   <h5><strong>Name:</strong> {project.name}</h5>
        //   {/* <br />
        //   <img className="responsive-img" src={project.owner.avatar_url}/>
        //   <p><strong>Description:</strong> {project.description}</p>
        //   <a href={project.html_url} target="_blank">Link to GitHub</a>
        //   <p><strong>Stars:</strong> {project.stargazers_count}</p> */}
        // </li>
      )
  }
}



export default Favorites;
