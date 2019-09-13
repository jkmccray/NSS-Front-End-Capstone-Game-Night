import React, { Component } from "react"
import { Header } from "semantic-ui-react"
import GameList from "../game-lists/GameList"
import UserGameListManager from "../../modules/UserGameListManager"

import "./UserGameLists.css"

class UserGameLists extends Component {
  activeUser = parseInt(sessionStorage.getItem("activeUser"))

  componentDidMount() {
    this.props.getAllUserLists()
  }

  handleDeleteListOnClick = (listId) => {
    UserGameListManager.deleteList(listId)
    .then(this.props.getAllUserLists)
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