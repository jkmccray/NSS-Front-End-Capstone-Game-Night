import React, { Component } from 'react'
//import the components we will need
import GameNightCard from './GameListCard'
import GameManager from '../../modules/GameManager'

class GameNightList extends Component {
  //define what this component needs to render
  state = {
    games: [],
  }

  componentDidMount() {
    console.log("GAME LIST: ComponentDidMount");
    //getAll from AnimalManager and hang on to that data; put it in state
    GameManager.getAll()
      .then((games) => {
        console.log(games)
        this.setState({
          games: games
        })
      })
  }

  // deleteAnimal = id => {
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
        {this.state.games.map(game =>
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
