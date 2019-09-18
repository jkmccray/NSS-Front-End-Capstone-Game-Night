import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Header, Icon, Button, Dropdown, Input } from "semantic-ui-react"
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

  displayGames = (arr, ownOrPlayed) => {
    return this.state[arr].length === 0
        ? <h3><Link to="/search" className="searchForGames__header">search</Link> for games to add!</h3>
        : <> <Header>{ownOrPlayed} {this.state[arr].length} games!</Header>
        <ul className="gameList">
          {this.state[arr].map(userAndGameObj =>
            <GameListCard
              key={userAndGameObj.id}
              obj={userAndGameObj}
              editingStatus={this.state.editingStatus}
              // handleDeleteGameFromListBtnOnClick={this.handleDeleteGameFromListBtnOnClick}
            />)}
        </ul> </>
    }


    render() {
      return (
        <div className="ownedPlayedGameList__div">
          {
            this.props.activeIndex === 3
            ? this.displayGames("ownedGames", " you own")
            : this.displayGames("playedGames", "you've played")
          }
        </div>
      )
    }
  }

  export default GameList
