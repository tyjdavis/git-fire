import React, { Component } from 'react';
import axios from 'axios';
import ProjectSearchResult from './projectSearchResult';
import base from './rebase';
import './App.css';

window.base = base;

class App extends Component {

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
    // whenever user logs in or out, run setUserState
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
      return <button onClick={this.logout.bind(this)}>Logout</button>
    } else {
      return <button onClick={this.login.bind(this)}>Login</button>
    }
  }

  searchGithubProjects (event) {
    event.preventDefault();
    const project = this.projectName.value;
    axios.get(`https://api.github.com/search/repositories?q=${project}`).then(response => this.setState({ searchResults: response.data }));
    this.projectName.value = '';
    //base.push(`/users/${this.state.user.uid}/projects`,
    //{ data: { name: project }})
  }

  formIfLoggedIn () {
    if (this.state.user.uid) {
      return (
        <form onSubmit={this.searchGithubProjects.bind(this)}>
          <input
            placeholder='Favorite GitHub Projects'
            ref={element => this.projectName = element} />
          <button>Search GitHub Repos</button>
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
          <h3>{results.total_count} Results</h3>
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

  addProject(project){
    const projectData = {name: project.name, id: project.id}
      this.setState({
        projects: this.state.projects.concat(projectData)
      })
  }


  removeProject(project){
    let projectId = project.id
    let projectData = this.state.projects

    this.setState ({
      projects: projectData.filter(object => object.id !== projectId)
    })}


  render() {
    return (
      <div className="container">
          {this.loginOrLogoutButton()}
        {this.formIfLoggedIn()}
        {this.displaySearchResults()}
      </div>
    );
  }
}

export default App;
