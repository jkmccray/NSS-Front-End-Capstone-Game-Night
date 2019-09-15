import React, { Component } from "react"
import { Image, Header } from "semantic-ui-react"
import GameNightCard from "../game-nights/GameNightCard"
import UserManager from "../../modules/UserManager"
import UsersAndGameNightsManager from "../../modules/FriendsInvitedToGameNightsManager"
import GameNightManager from "../../modules/GameNightManager"

import "./UserInfoCard.css"

class UserInfoCard extends Component {
  state = {
    username: "",
    gameNight: {}
  }

  today = new Date()

  componentDidMount() {
    this.getActiveUserName()
    this.getNextGameNight()
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))

  getActiveUserName = () => {
    return UserManager.getSingleUser(this.activeUser)
    .then(user => this.setState({username: user.username}))
  }

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
          this.setState({gameNight: nextGameNight})
        })
      }
    })
  }

  render() {
    return (
      <div className="userInfoCard__div">
        <Image circular className="profile__img" src="https://static.boredpanda.com/blog/wp-content/uploads/2018/04/handicapped-cat-rexie-the-handicat-dasha-minaeva-1-5acb4e9d44dc5__700.jpg" />
        <Header inverted className="profile__name">{this.state.username}</Header>
        <Header inverted>next game night:</Header>
        <div className="profileGameNight__div">
          <GameNightCard
          gameNight={this.state.gameNight}
          friendData={this.props.friendData}
          getAllFriendData={this.props.getAllFriendData}
          />
        </div>
        <div className="profileUserStats__div">
          <Header >you own __ games!</Header>
          <Header >you've played __ games!</Header>
        </div>
      </div>
    )
  }
}

export default UserInfoCard