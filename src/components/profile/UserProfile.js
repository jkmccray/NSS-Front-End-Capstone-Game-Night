import React, { Component } from "react"
import UserInfoCard from "./UserInfoCard"
import UserProfileData from "./UserProfileData" // similar to application views
// import ApplicationViews from "./components/ApplicationViews"
// import WelcomePage from "./components/welcome-and-login/WelcomePage"
// import NavBar from "./components/nav/NavBar"

import "./UserProfile.css"

class UserProfile extends Component {
  render() {
    return (
      <div className="profilePage">
        <UserInfoCard />
        <UserProfileData
          friendData={this.props.friendData}
          getAllFriendData={this.props.getAllFriendData}
        />
      </div>
    )
  }
}

export default UserProfile