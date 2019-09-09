import React, { Component } from 'react';
import UserData from '../../modules/UserManager'

// import './NavBar.css'

class LoginPage extends Component {
  state = {
    username: "",
    password: "",
    loadingStatus: false,
    loggedInStatus: false
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    UserData.getBasedOnSearch("username", user.username)
      .then((userArr) => {
        const userExists = userArr.length > 0
        const existingUserObj = userArr[0]
        const passwordMatches = existingUserObj.password === user.password
        if (userExists && passwordMatches) {
          sessionStorage.setItem("activeUser", existingUserObj.id)
          this.props.history.push("/")
        }
      })
  }

  render() {

    return (
      <div>
        <h1>Log In</h1>
        <input placeholder="Username" name="username" value={this.state.username} onChange={this.handleChange} />
        <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleChange} />
        <input type="submit" disabled={this.state.loadingStatus} value="Login" onClick={this.handleSubmit} />
      </div>
    )
  }
}

export default LoginPage;