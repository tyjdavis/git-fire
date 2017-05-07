import React, { Component } from 'react';
import axios from 'axios';
import ProjectSearchResult from './projectSearchResult';
import Favorites from './Favorites';
import base from './rebase';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

window.base = base;

class Home extends Component {

  constructor () {
    super();
    this.state = {
      user: {},
      searchResults: {},
      users: [],
      projects: []
    }
  }

  componentDidMount () {
    base.onAuth(this.setUserState.bind(this));
  }

  setUserState (user) {
    this.setState({
      user: user || {}
    });
    if (user) {
      this.offSwitchForProjects = base.syncState(`users/${user.uid}/projects`, {
        context: this,
        asArray: true,
        state: 'projects'
      });
      this.offSwitchForUsers = base.syncState(`users/${user.uid}/users`, {
        context: this,
        asArray: true,
        state: 'users'
      });
    }
  }

  componentWillUnmount () {
    base.removeBinding(this.offSwitchForUsers);
    base.removeBinding(this.offSwitchForProjects);
  }

  login () {
    base.authWithOAuthPopup('github', function (){});
  }

  logout () {
    base.unauth()
  }

  loginOrLogoutButton () {
    if (this.state.user.uid) {
      return <button className="waves-effect waves-light btn" onClick={this.logout.bind(this)}>Logout</button>
    } else {
      return <button className="waves-effect waves-light btn" onClick={this.login.bind(this)}>Login</button>
    }
  }


  searchGithubProjects (event) {
    event.preventDefault();
    const project = this.projectName.value;
    axios.get(`https://api.github.com/search/repositories?q=${project}`).then(response => this.setState({ searchResults: response.data }));
    this.projectName.value = '';
  }


  formIfLoggedIn () {
    if (this.state.user.uid) {
      return (
        <form onSubmit={this.searchGithubProjects.bind(this)}>
          <input
            placeholder='Favorite GitHub Projects'
            ref={element => this.projectName = element} />
          <button className="waves-effect waves-light btn">Search GitHub Repos</button>
        </form>
      )
    }
  }

  displaySearchResults () {
    if (this.state.searchResults.items) {
      const results = this.state.searchResults;
      const projectIds = this.state.projects.map(p => p.id);
      return (
        <div>
          <h6>{results.total_count} Results</h6>
          <ul>
            {results.items.map((project, index) => {
              return <ProjectSearchResult key={index} project={project}
              alreadyInFirebase={projectIds.includes(project.id)}
              addProject={this.addProject.bind(this)}
              removeProject={this.removeProject.bind(this)} />
            }
            )}
          </ul>
        </div>
      )
    }
  }

  displayFavorited() {
    if(this.state.projects) {
      const results = this.state.projects
      const projectId = this.state.projects.map(p => p.id);
      // console.log(projectId);
      return (
        <div>
          <h5><strong>Favorites</strong></h5>
          <ul>
            {results.map((project, index) => {
              return <Favorites key={index} project={project} />
            }
            )}
          </ul>
        </div>
      )
    }
  }


  addProject(project){
    let list = document.querySelector('.Favorites');
    let projectList = this.state.projects

    const projectData = {name: project.name, id: project.id}
      this.setState({
        projects: this.state.projects.concat(projectData)
      })
}



  removeProject(project){
    const projectId = project.id
    let projectData = this.state.projects

    this.setState ({
      projects: projectData.filter(object => object.id !== projectId)
    })
  }


  render() {
    return (
        <div>
          <div className="log">
            {this.loginOrLogoutButton()}
          </div>
          <div className="row">
            <div className="col s2 favorites">
              {this.displayFavorited()}
            </div>
            <div className="col s10">
              {this.formIfLoggedIn()}
              {this.displaySearchResults()}
            </div>
          </div>
        </div>
    );
  }
}

export default Home;
