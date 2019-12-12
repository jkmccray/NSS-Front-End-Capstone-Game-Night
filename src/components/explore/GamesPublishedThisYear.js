import React, { Component } from "react"
import { Header } from "semantic-ui-react"
import APIGameManager from "../../modules/APIGameManager"
import PopularGamesCard from "./PopularGamesCard"

import "./PopularGames.css"

class GamesPublishedThisYear extends Component {
  state = {
    recentGames: []
  }

  componentDidMount() {
    this.getGamesPublishedThisYear()
  }

  getGamesPublishedThisYear = () => {
    APIGameManager.getGamesPublishedThisYear()
    .then(response => {
      const recentGames = response.games
      this.setState({ recentGames: recentGames})
    })
  }

  render() {
    return (
      <>
      <Header className="popularGames__header" size="large">new releases</Header>
    <div className="popularGames__div">
      {this.state.recentGames.map(recentGame =>
        <PopularGamesCard
        key={recentGame.id}
        popularGame={recentGame}
        />
      )}
    </div> </>
    )
  }

}
export default GamesPublishedThisYear
