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
      return <button onClick={this.handleClick.bind(this, project)}>Remove from Firebase</button>
    } else {
      return <button onClick={this.handleClick.bind(this, project)}>Add to Firebase</button>
    }
  }

  render () {
    const project = this.props.project;
    return (
      <li className="section">
        <strong>Name: {project.name}</strong>
        <p><strong>Description:</strong> {project.description}</p>
        <a href={project.html_url}><strong>URL:</strong> {project.html_url}</a>
        <p><strong>Stars:</strong> {project.stargazers_count}</p>
        <img className="responsive-img" src={project.owner.avatar_url}/>
        <br />
        {this.addOrRemoveButton(project)}
        <div className="divider"></div>
      </li>
    )
  }
}

export default ProjectSearchResult;
