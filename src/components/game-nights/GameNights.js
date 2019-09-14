import React, { Component } from 'react'
import { withRouter } from "react-router-dom"
import GameNightCard from './GameNightCard'
import GameNightManager from "../../modules/GameNightManager"

import './GameNights.css'

class GameNights extends Component {
  state = {
    gameNights: []
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))

  componentDidMount() {
    this.getAllGameNights()
  }

  getAllGameNights = () => {
    this.props.match.path.includes("profile")
      ? this.props.getAllUserGameNights()
      : GameNightManager.getAllGameNights()
        .then(gameNights => {
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
      .then(this.getAllGameNights)
  }

  render() {
    return (
      <div className="gameNights__div">
        {this.determineGameNightsArr()
          ? this.determineGameNightsArr().map(gameNight =>
            <GameNightCard
              key={gameNight.id}
              gameNight={gameNight}
              friendData={this.props.friendData}
              getAllFriendData={this.props.getAllFriendData}
              handleDeleteGameNightOnClick={this.handleDeleteGameNightOnClick}/>)
          : null
        }
      </div>
    )
  }
}

export default withRouter(GameNights)
