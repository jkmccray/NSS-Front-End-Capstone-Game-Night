import React, { Component } from "react"
import { Header } from "semantic-ui-react"
import GameNightCard from "../game-nights/GameNightCard"

import "./UserGameNights.css"

class UserGameNights extends Component {
  activeUser = parseInt(sessionStorage.getItem("activeUser"))

  componentDidMount() {
    this.props.getAllUserGameNights()
  }

  // handleDeleteGameNightOnClick = (gameNightId) => {
  //   UserGameNightManager.deleteGameNight(ligameNightIdstId)
  //   .then(this.props.getAllUserGameNights)
  // }

  render() {
    return (
      <div id="userGameNights__container">
        {
          this.props.gameNights.length > 0
          ? this.props.gameNights.map(gameNight =>
          <GameNightCard
          key={gameNight.id}
          gameNight={gameNight}
          handleDeleteGameNightOnClick={this.handleDeleteGameNightOnClick}
          />)
        : <Header>Select the "create new game night" button to add game nights!</Header>
      }
      </div>
    )
  }
}

export default UserGameNights