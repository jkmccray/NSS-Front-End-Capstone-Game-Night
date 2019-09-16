import React, { Component } from 'react'
import { withRouter, Link } from "react-router-dom"
import { Header } from "semantic-ui-react"
import GameNightCard from './GameNightCard'
import GameNightManager from "../../modules/GameNightManager"
import FriendsInvitedToGameNights from "../../modules/FriendsInvitedToGameNightsManager"

import './GameNights.css'

class GameNights extends Component {
  state = {
    gameNights: []
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))
  today = new Date()

  componentDidMount() {
    this.getAllGameNights()
  }

  getAllGameNights = () => {
    this.props.match.path.includes("profile")
      ? this.props.getAllUserGameNights()
      : GameNightManager.getAllGameNights()
      .then(unfilteredGameNights => {
          const gameNights = unfilteredGameNights.filter(gameNight => new Date(gameNight.date_and_time) > this.today)
          this.setState({
            gameNights: gameNights,
          })
        })
  }

  determineGameNightsArr = () => {
    let gameNightsArr = []
    if (this.state.gameNights.length > 0) {
      gameNightsArr = this.state.gameNights
    } else {
      gameNightsArr = this.props.gameNights
    }
    return gameNightsArr
  }

  handleDeleteGameNightOnClick = (gameNightId) => {
    GameNightManager.deleteGameNight(gameNightId)
    FriendsInvitedToGameNights.getAllUsersAttendingAGameNight(gameNightId)
      .then(gameNightAndUsers => {
        gameNightAndUsers.forEach(gameNightAndUser => {
          FriendsInvitedToGameNights.removeUserFromGameNight(gameNightAndUser.id)
        })
        this.props.match.path.includes("profile")
          ? this.props.getAllUserGameNights()
          : this.getAllGameNights()

      })
  }

  render() {
    return (
      <div className="gameNights__div">
        {this.determineGameNightsArr() && this.determineGameNightsArr().length > 0
          ? this.determineGameNightsArr().map(gameNight =>
            <GameNightCard
              key={gameNight.id}
              gameNight={gameNight}
              friendData={this.props.friendData}
              getAllFriendData={this.props.getAllFriendData}
              getAllGameNights={this.getAllGameNights}
              handleDeleteGameNightOnClick={this.handleDeleteGameNightOnClick} />)
          : this.props.match.path.includes("profile")
            ? <Header>Select the "create game night" button to add game night!</Header>
            : <Header>Go to your <Link to="/profile">profile</Link> to create a game night!</Header>
        }
      </div>
    )
  }
}

export default withRouter(GameNights)
