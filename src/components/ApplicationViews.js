import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import GameNights from './game-nights/GameNights'
import ExploreGames from './explore/ExploreGames'
import SearchGames from './search-games/GameSearch'
import UserProfile from './profile/UserProfile'
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
          : <Redirect to="/" />
        }} />
        <Route path="/login" render={(props) => {
          return !this.userIsLoggedIn()
          ? <LoginPage {...props} />
          : <Redirect to="/" />
        }} />
        <Route path="/home" render={(props) => {
          return this.userIsLoggedIn()
          ? <GameNights />
          : <Redirect to="/" />
        }} />
        <Route path="/explore" render={(props) => {
          return this.userIsLoggedIn()
          ? <ExploreGames />
          : <Redirect to="/" />
        }} />
        <Route path="/search" render={(props) => {
          return this.userIsLoggedIn()
          ? <SearchGames />
          : <Redirect to="/" />
        }} />
        <Route path="/profile" render={(props) => {
          return this.userIsLoggedIn()
          ? <UserProfile />
          : <Redirect to="/" />
        }} />
      </React.Fragment>
    )
  }
}

export default ApplicationViews