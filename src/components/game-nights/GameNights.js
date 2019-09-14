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
    console.log({...this.props})
    this.getAllGameNights()
  }

  getAllGameNights = () => {
    GameNightManager.getAllGameNights()
      .then(gameNights => {
        this.setState({
          gameNights: gameNights,
        })
      })
  }

  handleDeleteGameNightOnClick = (gameNightId) => {
    GameNightManager.deleteGameNight(gameNightId)
      .then(this.getAllGameNights)
  }

  render() {
    return (
      <div className="gameNights__div">
        {this.state.gameNights.map(gameNight =>
          <GameNightCard
            key={gameNight.id}
            gameNight={gameNight}
            friendData={this.props.friendData}
            getAllFriendData={this.props.getAllFriendData}
            handleDeleteGameNightOnClick={this.handleDeleteGameNightOnClick}
          />
        )}
      </div>
    )
  }
}

export default withRouter(GameNights)
