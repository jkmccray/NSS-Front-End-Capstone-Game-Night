import React, { Component } from "react"
import { Button, Modal } from "semantic-ui-react"
import APIGameManager from "../../modules/APIGameManager"
import GameDetails from "../search-games/GameDetails"
import PopularGames from "./PopularGames"

import "./ExploreGames.css"

class ExploreGames extends Component {
  state = {
    searchResult: {}
  }

  componentDidMount() {
    this.getRandomGame()
  }

  getRandomGame = () => {
    APIGameManager.getRandomGame()
   .then(randomGame => this.setState({searchResult: randomGame.game}))
  }

  handleRandomGameBtnOnClick = () => {
    this.getRandomGame()
  }

  render() {
    return (
      <div className="exploreGames__div">
      <Modal closeIcon trigger={<Button onClick={this.handleRandomGameBtnOnClick}
      className="getRandomGame__btn">get random game</Button>}>
        <GameDetails searchResult={this.state.searchResult}/>
      </Modal>
      <PopularGames />
      </div>
    )
  }
}

export default ExploreGames