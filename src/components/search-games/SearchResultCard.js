import React, { Component } from "react"
import { Modal, Image, Button, Dropdown, Icon, Header, Checkbox } from "semantic-ui-react"
import GameDetails from "./GameDetails"

import "./SearchResultCard.css"

class SearchResultCard extends Component {
  state = {
    errored: false,
  }

  componentDidMount() {
    this.checkImageUrl()
  }

  checkImageUrl = () => {
    const img = document.createElement("IMG")
    img.src = this.props.searchResult.thumb_url
    img.onerror = () => {
      this.props.searchResult.thumb_url = "https://react.semantic-ui.com/images/wireframe/image.png"
      this.props.searchResult.image_url = "https://react.semantic-ui.com/images/wireframe/image.png"
      this.setState({ errored: true })
    }
  }

  displaySearchResultName = () => {
    return <Modal
      closeIcon
      trigger={<h4 className="searchResultCard__name">{this.props.searchResult.name}</h4>}
    >
      <Modal.Content>
        <GameDetails
          searchResult={this.props.searchResult}
        />
      </Modal.Content>
    </Modal>
  }

  displayAddToListBtn = () => {
    return <Modal className="searchResultCard__modal"
      closeIcon
      onClose={this.props.handleModalOnClose}
      open={this.props.showModal}
      trigger={
        <Button animated className="addGameToList__btn"
          onClick={(e) => this.props.handleAddGameToListBtnOnClick(e, this.props.searchResult)}>
          <Button.Content visible>
            <Icon className="addGameToList__icon"
              name="plus circle"
            />
          </Button.Content>
          <Button.Content hidden>add to list
          </Button.Content>
        </Button>
      }>
      < Modal.Content >
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
          }
        />
        <div className="checkbox__div">
          <div className="ui checkbox">
            <input id="playedGameCheckbox" type="checkbox" defaultChecked={this.props.playedGameCheckbox} onChange={this.props.handleCheckboxOnChange}/>
            <label htmlFor="playedGameCheckbox">I've played this game</label>
          </div>
          <div className="ui checkbox">
            <input id="ownedGameCheckbox" defaultChecked={this.props.ownedGameCheckbox} type="checkbox" onChange={this.props.handleCheckboxOnChange}/>
            <label htmlFor="ownedGameCheckbox">I own this game</label>
          </div>
        </div>
        <Button
          onClick={this.props.handleSaveGameToListBtnOnClick}
        >save</Button>
      </Modal.Content >
    </Modal>
  }

  render() {
    return (
      <li className="searchResultCard">
        <div className="searchResultCard__imgAndName">
          <div className="searchResultCardImg__div">
            <Image src={this.props.searchResult.thumb_url}
              className="searchResult__image" />
          </div>
          {this.displaySearchResultName()}
        </div>
        {this.displayAddToListBtn()}
      </li>
    )
  }
}

export default SearchResultCard