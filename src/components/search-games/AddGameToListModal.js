import React, { Component } from "react"
import { Modal, Image, Button, Dropdown, Icon, Header, Checkbox } from "semantic-ui-react"
import GameDetails from "./GameDetails"
import GamesOwnedAndPlayed from "../../modules/GamesOwnedAndPlayedManager"
import GameManager from "../../modules/GameManager"

import "./SearchResultCard.css"

class SearchResultCard extends Component {
  state = {
    playedGameCheckbox: false,
    ownedGameCheckbox: false,
    ownedAndPlayedGameId: 0,
  }

  componentDidMount() {
    this.checkGameIsPlayedOrOwnedAndSetState()
  }

  checkGameIsPlayedOrOwnedAndSetState = () => {
    GameManager.getGameByGameId(this.props.searchResult.id)
    .then(gameObjFromDb => {
      if (gameObjFromDb.length > 0) {
        GamesOwnedAndPlayed.getGamePlayedOrOwnedByActiveUser(gameObjFromDb[0])
        .then(results => {
            if (results.length > 0) {
              const gameAndUserObj = results[0]
              this.setState({
                ownedGameCheckbox: gameAndUserObj.owned,
                playedGameCheckbox: gameAndUserObj.played,
                ownedAndPlayedGameId: gameAndUserObj.id
              })
            }
          })
      }
    })
  }

  render() {
    return (
    <Modal className="searchResultCard__modal"
      closeIcon
      onClose={this.props.handleModalOnClose}
      open={this.props.showModal}>
      <Modal.Content>
        <Header size="large">select game list</Header>
        <Dropdown
          onChange={this.props.handleGameListSelectChange}
          placeholder='Select game list'
          className="search-field"
          id="selectedGameList"
          clearable fluid search selection
          options={
            this.props.userGameLists.map(gameList => ({
              key: gameList.id,
              text: gameList.name,
              value: gameList.id,
              id: gameList.id
            }))
          }/>
        <div className="checkbox__div">
          <div className="ui checkbox">
            <input id="playedGameCheckbox" type="checkbox" defaultChecked={this.state.playedGameCheckbox} onChange={this.props.handleCheckboxOnChange}/>
            <label htmlFor="playedGameCheckbox">I've played this game</label>
          </div>
          <div className="ui checkbox">
            <input id="ownedGameCheckbox" defaultChecked={this.state.ownedGameCheckbox} type="checkbox" onChange={this.props.handleCheckboxOnChange}/>
            <label htmlFor="ownedGameCheckbox">I own this game</label>
          </div>
        </div>
        <Button onClick={this.props.handleSaveGameToListBtnOnClick}>save</Button>
      </Modal.Content >
    </Modal>
    )
  }
}
export default SearchResultCard
