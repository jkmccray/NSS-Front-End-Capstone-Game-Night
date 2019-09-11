import React, { Component } from 'react'
import { Icon, Button } from "semantic-ui-react"
import GameNightCard from './GameListCard'
import GameManager from '../../modules/GameManager'
import GamesSavedToList from '../../modules/GameSavedToListManager'

import './GameList.css'

class GameNightList extends Component {
  state = {
    gamesInList: [],
    editingList: false
  }

  userListId = this.props.gameList.id

  componentDidMount() {
    this.getAllGamesInList()
  }

  getAllGamesInList = () => {
    GamesSavedToList.getAllGamesSavedToSingleList(this.userListId)
      .then(results => {
        this.setState({ gamesInList: results.map(result => result.game) })
        console.log(this.state)
      })
  }

  // deleteGame = id => {
  //   GameManager.delete(id)
  //     .then(() => {
  //       AnimalManager.getAll()
  //         .then((newAnimals) => {
  //           this.setState({
  //             animals: newAnimals
  //           })
  //         })
  //     })
  // }

  render() {
    return (
      <div className="gameList__div">
        <Button>
        <Icon
          name="ellipsis vertical"
          size="large"
          className="editGameList__icon"
        />
        </Button>
        <h3>{this.props.gameList.name}</h3>
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
