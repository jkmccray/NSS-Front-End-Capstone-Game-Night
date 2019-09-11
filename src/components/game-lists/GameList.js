import React, { Component } from 'react'
import { Icon, Button, Dropdown, Input } from "semantic-ui-react"
import GameNightCard from './GameListCard'
import UserGameListManager from "../../modules/UserGameListManager"
import GamesSavedToList from '../../modules/GameSavedToListManager'

import './GameList.css'

class GameNightList extends Component {
  state = {
    gamesInList: [],
    editingStatus: false,
    gamesInEditedList: [],
    editedListName: "",
    editedListId: 0
  }

  listId = this.props.gameList.id

  componentDidMount() {
    this.getAllGamesInList()
  }

  getAllGamesInList = () => {
    GamesSavedToList.getAllGamesSavedToSingleList(this.listId)
      .then(results => {
        this.setState({ gamesInList: results.map(result => result.game) })
      })
  }

  handleEditListOnClick = (event) => {
    const nodeType = event.target.nodeName
    let listId
    if (nodeType === "DIV") {
      listId = parseInt(event.target.id.split("--")[1])
    } else if (nodeType === "SPAN") {
      listId = parseInt(event.target.parentNode.id.split("--")[1])
    }
    UserGameListManager.getSingleUserList(listId)
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

  handleDeleteListOnClick = () => {

  }

  render() {
    return (
      <div className="gameList__div">
        {
          this.state.editingStatus
            ? <><Button className={`saveListChanges--${this.props.gameList.id}`}>save</Button>
              <Input
                id="editedListName"
                onChange={this.handleOnChange}
                defaultValue={this.state.editedListName} /> </>
            : <> <Dropdown
              id={`dropdownList--${this.props.gameList.id}`}
              pointing="right"
              className="editGameList__dropdown"
              icon={<Icon
                name="ellipsis vertical"
                size="large"
                className="editGameList__icon"
              />}>
              <Dropdown.Menu>
                <Dropdown.Item text="edit"
                  onClick={this.handleEditListOnClick}
                  id={`editList--${this.props.gameList.id}`} />
                <Dropdown.Divider />
                <Dropdown.Item text="delete"
                  onClick={this.handleDeleteListOnClick}
                  id={`deleteList--${this.props.gameList.id}`} />
              </Dropdown.Menu>
            </Dropdown>
              <h3 className="gameList__header">{this.props.gameList.name}</h3> </>
        }
        <ul className="gameList">
          {this.state.gamesInList.map(game =>
            <GameNightCard
              key={game.id}
              game={game}
              editingStatus={this.state.editingStatus}
            />
          )}
        </ul>
      </div>
    )
  }
}

export default GameNightList
