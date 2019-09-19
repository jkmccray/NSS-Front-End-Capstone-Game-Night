import React, { Component } from "react"
import UserInfoCard from "./UserInfoCard"
import UserProfileData from "./UserProfileData"
import UserManager from "../../modules/UserManager"
import UsersAndGameNightsManager from "../../modules/FriendsInvitedToGameNightsManager"
import GameNightManager from "../../modules/GameNightManager"

import "./UserProfile.css"

class UserProfile extends Component {
  state = {
    gameNight: {},
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))
  today = new Date()


  getNextGameNight = () => {
    UsersAndGameNightsManager.getAllGameNightsForSingleUser(this.activeUser)
      .then(userAndGameNights => {
        if (userAndGameNights.length > 0) {
          const sortedGameNights = userAndGameNights.filter(userAndGameNight => new Date(userAndGameNight.gameNight.date_and_time) > this.today)
          .map(userAndGameNight => userAndGameNight.gameNight)
          .sort((a, b) => (a.date_and_time > b.date_and_time) ? 1 : -1)
          const nextGameNight = sortedGameNights[0]
          GameNightManager.getSingleGameNight(nextGameNight.id)
            .then((gameNightObj) => {
              const creatorName = gameNightObj.user.username
              nextGameNight.user = {}
              nextGameNight.user.username = creatorName
              this.setState({ gameNight: nextGameNight })
            })
        }
      })
  }

  render() {
    return (
      <div className="profilePage">
        <UserInfoCard
          friendData={this.props.friendData}
          getAllFriendData={this.props.getAllFriendData}
          getNextGameNight={this.getNextGameNight}
          gameNight={this.state.gameNight}/>
        <UserProfileData
          friendData={this.props.friendData}
          getAllFriendData={this.props.getAllFriendData}
          getNextGameNight={this.getNextGameNight}/>
      </div>
    )
  }
}

export default UserProfile