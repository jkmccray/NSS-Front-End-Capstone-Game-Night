import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Icon, Button, Dropdown, Input } from "semantic-ui-react"
import GameListCard from '../game-lists/GameListCard'
import OwnedAndPlayedGames from "../../modules/GamesOwnedAndPlayedManager"

import '../game-lists/GameList.css'

class GameList extends Component {
  state = {
    ownedGames: [],
    playedGames: [],
    editingStatus: false
  }

  componentDidMount() {
    this.getAllOwnedGames()
    this.getAllPlayedGames()
  }

  getAllOwnedGames = () => {
    OwnedAndPlayedGames.getAllOwnedGames()
      .then(ownedGames => {
        this.setState({ownedGames: ownedGames})
      })
  }

  getAllPlayedGames = () => {
    OwnedAndPlayedGames.getAllPlayedGames()
      .then(playedGames => {
        this.setState({playedGames: playedGames})
      })
  }

  displayGames = (arr) => {
    return this.state[arr].length === 0
        ? <h3><Link to="/search" className="searchForGames__header">search</Link> for games to add!</h3>
        : <ul className="gameList">
          {this.state[arr].map(userAndGameObj =>
            <GameListCard
              key={userAndGameObj.id}
              obj={userAndGameObj}
              editingStatus={this.state.editingStatus}
              // handleDeleteGameFromListBtnOnClick={this.handleDeleteGameFromListBtnOnClick}
            />)}
        </ul>
    }


    render() {
      return (
        <div className="ownedPlayedGameList__div">
          {
            this.props.activeIndex === 3
            ? this.displayGames("ownedGames")
            : this.displayGames("playedGames")
          }
        </div>
      )
    }
  }

  export default GameList
