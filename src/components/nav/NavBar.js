import React, { Component } from 'react';
import { withRouter, NavLink } from "react-router-dom"
import { Button } from "semantic-ui-react"
import './NavBar.css'

class NavBar extends Component {
  userIsLoggedIn = () => parseInt(sessionStorage.getItem("activeUser")) > 0

  logOut = (event) => {
    sessionStorage.removeItem("activeUser")
    this.props.history.push("/")
  }

  render() {

    return (
      <>
        {
          this.userIsLoggedIn()
            ? <> <div className="logoutBtn__div"> <Button floated="right" className="logout__btn" onClick={this.logOut}>logout</Button></div>
              <nav>
                <ul className="container">
                  <li>
                    <picture>
                      <img className="logo" src={require('../../logo/game-night-logo_updated.jpg')} alt="logo" />
                    </picture>
                  </li>
                  <li className="nav-li"><NavLink className="nav-link" activeClassName="active-page" to="/home">game nights</NavLink></li>
                  <li className="nav-li"><NavLink className="nav-link" activeClassName="active-page" to="/explore">explore</NavLink></li>
                  <li className="nav-li"><NavLink className="nav-link" activeClassName="active-page" to="/search">search</NavLink></li>
                  <li className="nav-li"><NavLink className="nav-link" activeClassName="active-page" to="/profile">profile</NavLink></li>
                </ul>
              </nav> </>
              : <nav>
              <ul className="container">
                <li>
                  <picture>
                    <img className="logo-welcome" src={require('../../logo/game-night-logo_updated.jpg')} alt="logo" />
                  </picture>
                </li>
                {/* <li><Link className="nav-link" to="/">Register</Link></li>
                <li><Link className="nav-link" to="/explore">explore</Link></li>
                <li><Link className="nav-link" to="/game_nights">search</Link></li>
                <li><Link className="nav-link" to="/user_profile">profile</Link></li> */}
              </ul>
            </nav>
        }
      </>
    )
  }
}

export default withRouter(NavBar);