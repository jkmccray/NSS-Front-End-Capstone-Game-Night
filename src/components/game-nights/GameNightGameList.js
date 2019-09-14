import React, { Component } from 'react'
import GameListCard from '../game-lists/GameListCard'
import UserGameListManager from "../../modules/UserGameListManager"
import GamesSavedToList from '../../modules/GameSavedToListManager'

import '../game-lists/GameList.css'

class GameNightGameList extends Component {
  state = {
    gamesInList: [],
    gameListName: "",
    editingStatus: false,
    editedListName: "",
    showModal: false
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))
  listId = this.props.gameList.id

  componentDidMount() {
    this.getAllGamesInList()
  }

  getAllGamesInList = () => {
    GamesSavedToList.getAllGamesSavedToSingleList(this.listId)
      .then(gameAndListObjs => {
        this.setState({
          gamesInList: gameAndListObjs,
          gameListName: this.props.gameList.name
        })
      })
  }

  handleEditListOnClick = (event) => {
    UserGameListManager.getSingleUserList(this.listId)
      .then(listObj => {
        this.setState({
          editingStatus: true,
          editedListName: listObj.name
        })
      })
  }

  handleOnChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleDeleteGameFromListBtnOnClick = (event) => {
    const nodeType = event.target.nodeName
    let id
    if (nodeType === "BUTTON") {
      id = parseInt(event.target.id.split("--")[1])
    } else if (nodeType === "I") {
      id = parseInt(event.target.parentNode.id.split("--")[1])
    }
    GamesSavedToList.deleteGameFromUserList(id)
      .then(this.getAllGamesInList)
  }

  handleSaveEditChangesBtnOnClick = (event) => {
    const listObj = {
      id: this.listId,
      userId: this.activeUser,
      name: this.state.editedListName
    }
    UserGameListManager.saveEditedListName(listObj)
      .then(() => this.setState({
        editingStatus: false,
        gameListName: this.state.editedListName
      }))
  }

  render() {
    return (
      <div className="gameList__div">
        <h3 className="gameList__header">{this.state.gameListName}</h3>
        <ul className="gameList">
          {this.state.gamesInList.map(game =>
            <GameListCard
              key={game.id}
              gameAndListObj={game}
              editingStatus={this.state.editingStatus}
              handleDeleteGameFromListBtnOnClick={this.handleDeleteGameFromListBtnOnClick}
            />
          )}
        </ul>
      </div>
    )
  }
}

export default GameNightGameList
