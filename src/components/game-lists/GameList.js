import React, { Component } from 'react'
//import the components we will need
import GameNightCard from './GameListCard'
import GameManager from '../../modules/GameManager'

class GameNightList extends Component {
  //define what this component needs to render
  state = {
    gamesInList: [],
  }

  componentDidMount() {
    console.log("GAME LIST: ComponentDidMount");
    //getAll from AnimalManager and hang on to that data; put it in state
    GameManager.getAllGames()
      .then((games) => {
        // console.log(games)
        this.setState({
          games: games
        })
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
    console.log("GameList: Render");

    return (
      <div className="container-cards">
        {this.state.gamesInList.map(game =>
          <GameNightCard
          // key={animal.id}
          // animal={animal}
          // deleteAnimal={this.deleteAnimal}
          />
        )}
      </div>
    )
  }
}

export default GameNightList
