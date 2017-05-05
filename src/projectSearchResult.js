import React, { Component } from 'react';

class ProjectSearchResult extends Component {

  handleClick(project){
    if (this.props.alreadyInFirebase) {
      this.props.removeProject(project)
    } else {
      this.props.addProject(project)
    }
  }


  addOrRemoveButton(project){
    if (this.props.alreadyInFirebase){
      return <button className="waves-effect waves-light btn" onClick={this.handleClick.bind(this, project)}>Remove from Firebase</button>
    } else {
      return <button className="waves-effect waves-light btn" onClick={this.handleClick.bind(this, project)}>Add to Firebase</button>
    }
  }

  render () {
    const project = this.props.project;
    return (
      <li className="section">
        <h5><strong>Name:</strong> {project.name}</h5>
        <br />
        <img className="responsive-img" src={project.owner.avatar_url}/>
        <p><strong>Description:</strong> {project.description}</p>
        <a href={project.html_url} target="_blank">Link to GitHub</a>
        <p><strong>Stars:</strong> {project.stargazers_count}</p>
        <p>{this.addOrRemoveButton(project)}</p>
        <div className="divider"></div>
      </li>
    )
  }
}

export default ProjectSearchResult;
