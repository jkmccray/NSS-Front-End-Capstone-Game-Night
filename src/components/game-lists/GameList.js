import React, { Component } from 'react'
import { Icon, Button, Dropdown } from "semantic-ui-react"
import GameNightCard from './GameListCard'
import GameManager from '../../modules/GameManager'
import GamesSavedToList from '../../modules/GameSavedToListManager'

import './GameList.css'

class GameNightList extends Component {
  state = {
    gamesInList: [],
    editingStatus: false
  }

  userListId = this.props.gameList.id

  componentDidMount() {
    this.getAllGamesInList()
  }

  getAllGamesInList = () => {
    GamesSavedToList.getAllGamesSavedToSingleList(this.userListId)
      .then(results => {
        this.setState({ gamesInList: results.map(result => result.game) })
      })
  }

  render() {
    return (
      <div className="gameList__div">
        <Dropdown
        pointing="right"
        className="editGameList__dropdown"
        icon={<Icon
            name="ellipsis vertical"
            size="large"
            className="editGameList__icon"
          />}>
          <Dropdown.Menu>
            <Dropdown.Item text="edit"
            id={`editList--${this.props.gameList.id}`}/>
            <Dropdown.Divider />
            <Dropdown.Item text="delete"
            id={`deleteList--${this.props.gameList.id}`}/>
          </Dropdown.Menu>
        </Dropdown>
        <h3 className="gameList__header">{this.props.gameList.name}</h3>
        <ul className="gameList">
          {this.state.gamesInList.map(game =>
            <GameNightCard
              key={game.id}
              game={game}
            />
          )}
        </ul>
      </div>
    )
  }
}

export default GameNightList
