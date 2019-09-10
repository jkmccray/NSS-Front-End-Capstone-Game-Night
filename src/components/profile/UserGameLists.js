import React, { Component } from "react"
import GameList from "../game-lists/GameList"
import UserGameListManager from "../../modules/UserGameListManager"

// import "./Kennel.css"

class UserGameLists extends Component {
  state={
    gameLists: []
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))

  componentDidMount() {
    this.getAllUserLists()
  }
  getAllUserLists = () => {
    UserGameListManager.getAllUserLists(this.activeUser)
    .then(gameLists => {
      this.setState({gameLists: gameLists})
    })
  }

  render() {
    return (
      <div>
        {this.state.gameLists.map(gameList =>
          <GameList
          key={gameList.id}
          gameList={gameList}
          // deleteGameList={this.deleteGameList}
          />
        )}
      </div>
    )
  }
}

export default UserGameLists