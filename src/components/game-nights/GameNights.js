import React, { Component } from 'react'
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
    GameNightManager.getAllGameNights()
      .then(gameNights => {
        this.setState({
          gameNights: gameNights,
        })
      })
  }

//   handleEditListOnClick = (event) => {
//     UserGameListManager.getSingleGameNight(this.listId)
//       .then(listObj => {
//         this.setState({
//           editingStatus: true,
//           editedListName: listObj.name
//         })
//       })
//   }

//   handleOnChange = (event) => {
//     this.setState({ [event.target.id]: event.target.value })
//   }

//   handleDeleteGameFromListBtnOnClick = (event) => {
//     const nodeType = event.target.nodeName
//     let id
//     if (nodeType === "BUTTON") {
//       id = parseInt(event.target.id.split("--")[1])
//     } else if (nodeType === "I") {
//       id = parseInt(event.target.parentNode.id.split("--")[1])
//     }
//     GameNightManager.deleteGameFromUserList(id)
//       .then(this.getAllGamesInList)
//   }

//   handleSaveEditChangesBtnOnClick = (event) => {
//     const listObj = {
//       id: this.listId,
//       userId: this.activeUser,
//       name: this.state.editedListName
//     }
//     UserGameListManager.saveEditedListName(listObj)
//       .then(() => this.setState({
//         editingStatus: false,
//         gameListName: this.state.editedListName
//       }))
//   }

  render() {
    return (
      <div className="gameNights__div">
          {this.state.gameNights.map(gameNight =>
            <GameNightCard
              key={gameNight.id}
              gameNight={gameNight}
              friendData={this.props.friendData}
              getAllFriendData={this.props.getAllFriendData}
              // editingStatus={this.state.editingStatus}
              // handleDeleteGameFromListBtnOnClick={this.handleDeleteGameFromListBtnOnClick}
            />
          )}
      </div>
    )
  }
}

export default GameNights
