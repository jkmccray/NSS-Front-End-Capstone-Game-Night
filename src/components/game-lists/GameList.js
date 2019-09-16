import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Icon, Button, Dropdown, Input } from "semantic-ui-react"
import GameNightCard from './GameListCard'
import UserGameListManager from "../../modules/UserGameListManager"
import GamesSavedToList from '../../modules/GameSavedToListManager'

import './GameList.css'

class GameList extends Component {
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

  handleDeleteGameFromListBtnOnClick = (event, id) => {
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

  displayEditAndDeleteMenu = () => {
    return <> <Dropdown
      id={`dropdownList--${this.props.gameList.id}`}
      pointing="right"
      className="editGameList__dropdown"
      icon={<Icon
        name="ellipsis vertical"
        size="large"
        className="editGameList__icon"/>}>
      <Dropdown.Menu>
        <Dropdown.Item text="edit"
          onClick={this.handleEditListOnClick}
          id={`editList--${this.props.gameList.id}`} />
        <Dropdown.Divider />
        <Dropdown.Item text="delete"
          onClick={() => this.props.handleDeleteListOnClick(this.listId)}
          id={`deleteList--${this.props.gameList.id}`} />
      </Dropdown.Menu>
    </Dropdown>
      <h3 className="gameList__header">{this.state.gameListName}</h3> </>
  }

  render() {
    return (
      <div className="gameList__div">
        {
          this.state.editingStatus
            ? <><Button
              onClick={this.handleSaveEditChangesBtnOnClick}
              id={`saveListChanges--${this.props.gameList.id}`}>save</Button>
              <Input
                id="editedListName"
                onChange={this.handleOnChange}
                defaultValue={this.state.editedListName} /> </>
            : this.displayEditAndDeleteMenu()
        }
        {
          this.state.gamesInList.length === 0 && !this.state.editingStatus
            ? <h3><Link to="/search" className="searchForGames__">search</Link> for games to add to this list!</h3>
            : <ul className="gameList">
              {this.state.gamesInList.map(game =>
                <GameNightCard
                  key={game.id}
                  gameAndListObj={game}
                  editingStatus={this.state.editingStatus}
                  handleDeleteGameFromListBtnOnClick={this.handleDeleteGameFromListBtnOnClick}
                />)}
            </ul>
        }

      </div>
    )
  }
}

export default GameList
