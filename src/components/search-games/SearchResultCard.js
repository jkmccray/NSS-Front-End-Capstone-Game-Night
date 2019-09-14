import React, { Component } from "react"
import { Modal, Image, Button, Dropdown } from "semantic-ui-react"
import GameDetails from "./GameDetails"

import "./SearchResultCard.css"

class SearchResultCard extends Component {
  render() {
    return (
      <li className="searchResultCard">
        <Image src={this.props.searchResult.thumb_url} className="searchResult__image" />
        <Modal
        closeIcon
        trigger={<h4>{this.props.searchResult.name}</h4>}
        >
          <Modal.Content>
            <GameDetails
            searchResult={this.props.searchResult}
            />
          </Modal.Content>
        </Modal>
        <Modal
          closeIcon
          onClose={this.props.handleModalOnClose}
          open={this.props.showModal}
          trigger={<Button
            onClick={this.props.handleAddGameToListBtnOnClick}
            className="addGameToList__btn"
            id={`addGameToListBtn--${this.props.searchResult.id}`}
          >+</Button>}>
          <Modal.Header>select game list</Modal.Header>
          < Modal.Content >
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
              }
            />
            <Button
              onClick={this.props.handleSaveGameToListBtnOnClick}
            >save</Button>
          </Modal.Content >
        </Modal>
      </li>
    )
  }
}

export default SearchResultCard