import React, { Component } from 'react';
import axios from 'axios';


class Favorites extends Component {


constructor () {
  super();
  this.state = {
    project: [],
    owner: []
  }
}

  componentDidMount() {
    const projectId = this.props.match.params.id;
      axios.get(`https://api.github.com/repositories/${projectId}`).then(response => this.setState({ project: response.data, owner: response.data.owner }));
}


  render() {
    const project = this.state.project;
    const owner = this.state.owner;
    console.log(project);
    return (
      <div className="container">
        <h1 className="center"><strong>{project.name}</strong></h1>
        <h4><strong>Owner:</strong> {owner.login}</h4>
        <ul>
        <img className="responsive-img" src={owner.avatar_url}/>
        <br />
        <a href={owner.html_url} target="_blank">Link to Owner's Github</a>
        </ul>
        </div>
)}
}

export default Favorites;
