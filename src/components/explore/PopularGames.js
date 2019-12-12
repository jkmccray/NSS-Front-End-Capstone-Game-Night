import React, { Component } from "react"
import { Header } from "semantic-ui-react"
import APIGameManager from "../../modules/APIGameManager"
import PopularGamesCard from "./PopularGamesCard"

import "./PopularGames.css"

class PopularGames extends Component {
  state = {
    popularGames: []
  }

  componentDidMount() {
    this.getPopularGames()
  }

  getPopularGames = () => {
    APIGameManager.getPopularGames()
    .then(response => {
      const popularGames = response.games
      this.setState({ popularGames: popularGames})
    })
  }

  render() {
    return (
      <>
      <Header className="popularGames__header" size="large">popular games</Header>
    <div className="popularGames__div">
      {this.state.popularGames.map(popularGame =>
        <PopularGamesCard
        key={popularGame.id}
        popularGame={popularGame}
        />
      )}
    </div> </>
    )
  }

}
export default PopularGames
