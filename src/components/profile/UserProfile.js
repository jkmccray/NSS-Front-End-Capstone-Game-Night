import React, { Component } from "react"
import UserInfoCard from "./UserInfoCard"
import UserProfileData from "./UserProfileData" // similar to application views
// import ApplicationViews from "./components/ApplicationViews"
// import WelcomePage from "./components/welcome-and-login/WelcomePage"
// import NavBar from "./components/nav/NavBar"

// import "./Kennel.css"

class UserProfile extends Component {
  render() {
    return (
      <>
        <UserInfoCard />
        <UserProfileData
          friendData={this.props.friendData}
          getAllFriendData={this.props.getAllFriendData}
        />
      </>
    )
  }
}

export default UserProfile