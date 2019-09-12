import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import GameNights from './game-nights/GameNights'
import ExploreGames from './explore/ExploreGames'
import SearchGames from './search-games/GameSearch'
import UserProfile from './profile/UserProfile'
import WelcomePage from "./welcome-and-login/WelcomePage"
import RegisterPage from './welcome-and-login/RegisterPage'
import LoginPage from './welcome-and-login/LoginPage'
import UserManager from "../modules/UserManager";
import FriendshipManager from "../modules/FriendshipManager";

class ApplicationViews extends Component {
  state = {
    users: [],
    friendships: [],
    friendsWithUserInfo: [],
    acceptedFriends: []
  }

  // Get users, frienships, and pending/accepted friends (as user objects) and set state with these arrays
  getAllFriendData = () => {
    const activeUserId = sessionStorage.getItem("activeUser")
    UserManager.getAllExcludingActiveUser(activeUserId)
      .then(users => { this.setState({ users: users }) })
    return FriendshipManager.getAllFriendships("userId", activeUserId)
      .then(friendships => {
        FriendshipManager.getAllFriendships("otherUser", activeUserId)
          .then(otherFriends => {
            const allFriends = friendships.concat(otherFriends)
            const pendingAndAcceptedFriends = this.filterFriendsToDisplay(allFriends)
            const acceptedFriends = this.filterAcceptedFriends(allFriends)
            // Use allFriends array to set state for both 'friendships' and 'friendsWithUserInfo' so that 'friendsWithUserInfo' is not dependent on state of 'friendships'
            this.setState({
              friendships: allFriends,
              friendsWithUserInfo: pendingAndAcceptedFriends,
              acceptedFriends: acceptedFriends
            })
          })
      })
  }

  // Filter friends to display on the friends list page. Includes pending and accepted friends
  filterFriendsToDisplay = (allFriends) => {
    const pendingAndAcceptedFriends = this.state.users.filter(user => {
      return allFriends.find(friendship => user.id === friendship.userId || user.id === friendship.otherUser)
    })
    return pendingAndAcceptedFriends;
  }

  // Filter down to accepted friends for displaying friends' news and events
  filterAcceptedFriends = (allFriends) => {
    const acceptedFriends = this.state.users.filter(user => {
      return allFriends.find(friendship => (user.id === friendship.userId || user.id === friendship.otherUser) && friendship.isFriend)
    })
    return acceptedFriends;
  }

  componentDidMount() {
    this.getAllFriendData()
  }

  isAuthenticated = () => parseInt(sessionStorage.getItem("activeUser")) > 0

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return !this.isAuthenticated()
          ? <WelcomePage />
          : <Redirect to="/home" />
        }} />
        <Route path="/register" render={(props) => {
          return !this.isAuthenticated()
          ? <RegisterPage {...props} />
          : <Redirect to="/" />
        }} />
        <Route path="/login" render={(props) => {
          return !this.isAuthenticated()
          ? <LoginPage {...props} />
          : <Redirect to="/" />
        }} />
        <Route path="/home" render={(props) => {
          return this.isAuthenticated()
          ? <GameNights
          friendData={this.state}
          getAllFriendData={this.getAllFriendData}
          />
          : <Redirect to="/" />
        }} />
        <Route path="/explore" render={(props) => {
          return this.isAuthenticated()
          ? <ExploreGames />
          : <Redirect to="/" />
        }} />
        <Route path="/search" render={(props) => {
          return this.isAuthenticated()
          ? <SearchGames />
          : <Redirect to="/" />
        }} />
        <Route path="/profile" render={(props) => {
          return this.isAuthenticated()
          ? <UserProfile
          friendData={this.state}
          getAllFriendData={this.getAllFriendData}/>
          : <Redirect to="/" />
        }} />
      </React.Fragment>
    )
  }
}

export default ApplicationViews