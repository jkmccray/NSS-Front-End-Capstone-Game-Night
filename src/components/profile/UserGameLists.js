import React, { Component } from "react"
import { Header } from "semantic-ui-react"
import GameList from "../game-lists/GameList"
import UserGameListManager from "../../modules/UserGameListManager"
import UsersAndGameNights from "../../modules/FriendsInvitedToGameNightsManager"
import GameNights from "../../modules/GameNightManager"

import "./UserGameLists.css"

class UserGameLists extends Component {
  state = {
    gameNights: []
  }
  activeUser = parseInt(sessionStorage.getItem("activeUser"))

  componentDidMount() {
    this.props.getAllUserLists()
  }

  handleDeleteListOnClick = (listId) => {
    GameNights.getAllGameNightsWithSameList(listId)
    .then(gameNights => {
      if (gameNights.length > 0) {
        const gameNightNames = gameNights.map(gameNight => gameNight.name).join(", ")
        alert(`this list is associated with game night(s): ${gameNightNames}`)
      } else {
        UserGameListManager.deleteList(listId)
        .then(this.props.getAllUserLists)
      }
    })
  }

  render() {
    return (
      <div id="userGameList__container">
        {
          this.props.gameLists.length > 0
          ? this.props.gameLists.map(gameList =>
          <GameList
          key={gameList.id}
          gameList={gameList}
          handleDeleteListOnClick={this.handleDeleteListOnClick}
          />)
        : <Header>Select the "create new list" button to add game lists!</Header>
      }
      </div>
    )
  }
}

export default UserGameLists