import React, { Component } from 'react';
import { Link } from "react-router-dom"
import UserData from '../../modules/UserManager'

// import './welcome-and-login.css'

class RegisterPage extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
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
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    }
    const formIsNotCompleted = !(user.first_name && user.last_name && user.email && user.username && user.password)
    UserData.get("username", user.username)
      .then((userArr) => {
        const usernameIsNotUnique = userArr.length > 0
        UserData.get("email", user.email)
          .then((users) => {
            const emailIsNotUnique = users.length > 0
            if (usernameIsNotUnique) {
              alert("Username already taken. Choose a different username.")
            }
            else if (emailIsNotUnique) {
              alert("Email already exists. Use a different email or log in.")
            }
            else if (formIsNotCompleted) {
              alert("Fill out all fields")
            }
            else {
              UserData.post(user)
                .then((newUser) => {
                  sessionStorage.setItem("activeUser", newUser.id)
                  this.setState({
                    loadingStatus: true,
                    loggedInStatus: true
                  })
                })
                .then(() => {
                  this.props.history.push("/home")
                })
            }
          })
      })
  }

  render() {

    return (
      <form>
        <h1>Register New User</h1>
        <input required name="first_name" type="text" placeholder="First Name" value={this.state.first_name}
          onChange={this.handleChange} />
        <input required name="last_name" type="text" placeholder="Last Name" value={this.state.last_name}
          onChange={this.handleChange} />
        <input required name="email" type="email" placeholder="Email" value={this.state.email}
          onChange={this.handleChange} />
        <input required name="username" type="text" placeholder="Username" value={this.state.username}
          onChange={this.handleChange} />
        <input required name="password" type="password" placeholder="Password" value={this.state.password}
          onChange={this.handleChange} />
        <input type="submit" disabled={this.state.loadingStatus} value="Register" onClick={this.handleSubmit} />
      </form>
    )
  }
}

export default RegisterPage;