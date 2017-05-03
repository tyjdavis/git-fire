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

  // componentDidMount(){ //this logs the user in on refresh
  //   var authHandler = (error, data) => {
  //     console.log(data.user);
  //     this.setState({
  //       user: data.user
  //     })
  //   }
  //   //taken from documentation
  //   base.authWithOAuthPopup('google', authHandler);
  // }

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
      this.listIfLoggedIn();
    }
    base.authWithOAuthPopup('google', authHandler);
  }


  loginOrLogoutButton(){
    if(this.state.login) {
      return <button onClick={this.logout.bind(this)}>Logout</button>
    } else{
      return <button onClick={this.login.bind(this)}>Login</button>
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
        <div>
        <form onSubmit={this.addProjectToFirebase.bind(this)}>
          <input
            placeholder="Add Github Projects"
            ref={element => this.projectName = element}/>
          <button>Add Project to Firebase</button>
        </form>
        <form onSubmit={this.addUsertoFirebase.bind(this)}>
          <input
            placeholder="Add Github Users"
            ref={element => this.gitName = element}/>
          <button>Add User to Firebase</button>
        </form>
      </div>
       )
    }
  }



  listIfLoggedIn() {
    if(this.state.login) {
      base.fetch(`/users/${this.state.user.uid}/users`, {context: this, asArray: true} )
      .then(data => {
        this.setState ({
        userData: data
      })});
    }
  }


  printUsers(){
    if (this.state.userData) {
      return (
        <div>
        {this.state.userData.map((arr,index) => {
          return (
          <li key={index}>{arr}</li>
        )}
      )}
      </div>
      )
    }
  }


  render() {
    return (
      <div className="App">
          {this.loginOrLogoutButton()}
          {this.formIfLoggedIn()}
          {this.printUsers()}
      </div>
    );
  }
}

export default App;
