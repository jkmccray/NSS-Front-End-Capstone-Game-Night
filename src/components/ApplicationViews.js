import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import NavBar from './nav/NavBar'
import Home from './home/Home'
import GameNightList from './game-nights/GameNightList';
import WelcomePage from "./welcome-and-login/WelcomePage"
import RegisterPage from './welcome-and-login/RegisterPage'
import LoginPage from './welcome-and-login/LoginPage'


class ApplicationViews extends Component {

  userIsLoggedIn = () => parseInt(sessionStorage.getItem("activeUser")) > 0

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return !this.userIsLoggedIn()
          ? <WelcomePage />
          : <Redirect to="/home" />
        }} />
        <Route path="/register" render={(props) => {
          return !this.userIsLoggedIn()
          ? <RegisterPage {...props} />
          : <Redirect to="/home" />
        }} />
        <Route path="/login" render={(props) => {
          return !this.userIsLoggedIn()
          ? <LoginPage {...props} />
          : <Redirect to="/home" />
        }} />
        <Route path="/home" render={(props) => {
          return this.userIsLoggedIn()
          ?<> <NavBar {...props} /> <Home /> </>
          : <Redirect to="/" />
        }} />
        {/* <Route path="/explore" render={(props) => {
          return this.userIsLoggedIn)
          ? <ExploreGames />
          : <Redirect to="/" />
        }} /> */}
        <Route path="/game_nights" render={(props) => {
          return this.userIsLoggedIn()
          ? <> <NavBar {...props} /> <GameNightList /> </>
          : <Redirect to="/" />
        }} />
        {/* <Route path="/user_profile" render={(props) => {
          return this.userIsLoggedIn)
          ? <UserProfile />
          : <Redirect to="/" />
        }} /> */}
      </React.Fragment>
    )
  }
}

export default ApplicationViews