import React, { Component } from 'react';
import base from './rebase';
import './App.css';

window.base = base;

class App extends Component {

  constructor (){
    super();
    this.state = {
      user: {} //initializing state at the start. Typically will be an EMPTY object or string
    };
  }


  logout(){
    base.unauth()
    this.setState({
      user:{},
      login: false
    })
  } //you can check to see if you are logged out by typing base.auth().currentUser into console. should return null


  login(){
    var authHandler = (error, data) => {
      this.setState({
        user: data.user,
        login: true
      })
      this.projectsIfloggedIn();
      this.usersIfLoggedIn();
    }
    base.authWithOAuthPopup('google', authHandler);
  }


  loginOrLogoutButton(){
    if(this.state.login) {
      return <button className="waves-effect waves-light btn" onClick={this.logout.bind(this)}>Logout</button>
    } else{
      return <button className="waves-effect waves-light btn" onClick={this.login.bind(this)}>Login</button>
    }
  }


  addProjectToFirebase(event){
    event.preventDefault();
    const project = this.projectName.value; //refering to the ref input element in formIfLoggedIn
    base.push(`/users/${this.state.user.uid}/projects`, { data: project }) //first argument is destination ie endpoint
  }

  addUsertoFirebase(event){
    event.preventDefault();
    const gitUser = this.gitName.value;
    base.push(`/users/${this.state.user.uid}/users`, { data: gitUser })
  }


  formIfLoggedIn(){
    if(this.state.login) {
      return (
        <div className="row">
          <form className="col s6" onSubmit={this.addProjectToFirebase.bind(this)}>
            <input
              placeholder="Add Github Projects to Firebase"
              ref={element => this.projectName = element}/>
            <button className="btn-floating btn-large waves-effect waves-light red">Add Project to Firebase</button>
          </form>
          <form className="col s6" onSubmit={this.addUsertoFirebase.bind(this)}>
            <input
              placeholder="Add Github Users to Firebase"
              ref={element => this.gitName = element}/>
            <button className="btn-floating btn-large waves-effect waves-light red">Add User to Firebase</button>
          </form>
        </div>
       )
    }
  }


  usersIfLoggedIn() {
    if(this.state.login) {
      base.fetch(`/users/${this.state.user.uid}/users`, {context: this, asArray: true} )
      .then(data => {
        this.setState ({
        userData: data
      })});
    }
  }

  projectsIfloggedIn() {
    if(this.state.login) {
      base.fetch(`/users/${this.state.user.uid}/projects`, {context: this, asArray: true})
      .then(data => {
        this.setState ({
        projectData: data
      })});
    }
  }


  printLists(){
    if (this.state.projectData && this.state.userData) {
      return (
        <div className="row">
          <div className="col s6"><h4>Projects</h4>
            {this.state.projectData.map((arr,index) => {
              return (
                <li key={index}>{arr}</li>
              )}
            )}
          </div>
          <div className="col s6"><h4>Users</h4>
            {this.state.userData.map((arr,index) => {
              return (
                <li key={index}>{arr}</li>
              )}
            )}
        </div>
      </div>
      )
    }
  }

  render() {
    return (
      <div className="container">
          {this.loginOrLogoutButton()}
          <br />
          {this.formIfLoggedIn()}
          {this.printLists()}
      </div>
    );
  }
}

export default App;
