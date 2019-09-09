import React, { Component } from 'react';
import { Link } from "react-router-dom"
import './NavBar.css'

class NavBar extends Component {
  state = {loggedIn: true}

  logOut = (event) => {
    sessionStorage.removeItem("activeUser")
    this.props.history.push("/")
  }

  render(){

    return (
      <>
      <button onClick={this.logOut}>Logout</button>
      <header>
      <picture>
            <img id="logo" src={require('../../images/image.svg')} alt="logo" />
          </picture>
        <h1 className="site-title">Game Night<br />
          {/* <small>text</small> */}
        </h1>
        <nav>
          <ul className="container">
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li><Link className="nav-link" to="/explore">Explore Games</Link></li>
            <li><Link className="nav-link" to="/game_nights">Create Game Nights</Link></li>
            <li><Link className="nav-link" to="/user_profile">Profile</Link></li>
          </ul>
        </nav>
      </header>
      </>
    )
  }
}

export default NavBar;