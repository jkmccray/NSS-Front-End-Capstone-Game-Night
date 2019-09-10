import React, { Component } from 'react'
//import the components we will need
import GameNightCard from './GameListCard'
import GameManager from '../../modules/GameManager'
import GamesSavedToList from '../../modules/GameSavedToListManager'

class GameNightList extends Component {
  state = {
    gamesInList: [],
  }

  userListId = this.props.gameList.id

  componentDidMount() {
    this.getAllGamesInList()
  }

  getAllGamesInList = () => {
    GamesSavedToList.getAllGamesSavedToSingleList(this.userListId)
    .then(results => {
      this.setState({gamesInList: results})
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
      <>
      <h3>{this.props.gameList.name}</h3>
      <div className="gameList">
        {this.state.gamesInList.map(game =>
          <GameNightCard
          key={game.id}
          // animal={animal}
          // deleteAnimal={this.deleteAnimal}
          />
        )}
      </div>
      </>
    )
  }
}

export default GameNightList
