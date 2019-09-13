import React, { Component } from 'react';
import { Tab, Button, Modal } from "semantic-ui-react"
import UserFriends from "./UserFriends"
import UserGameLists from "./UserGameLists"
import UserFriendSearch from "./UserFriendSearch"
import CreateGameListForm from './CreateGameListForm';
import CreateGameNightForm from './CreateGameNightForm';
import GameListManager from "../../modules/UserGameListManager"
import GameNightManager from "../../modules/GameNightManager"


class UserProfileData extends Component {
  state = {
    activeIndex: 0,
    searchingForFriends: false,
    showCreateListModal: false,
    gameListName: "",
    gameLists: [],
    showCreateGameNightModal: false,
    gameNightName: "",
    gameNightDate: "",
    gameNightLocation: "",
    userGameListId: 0
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))

  panes = [
    {
      menuItem: 'my game lists', render: () => <Tab.Pane><UserGameLists
        gameLists={this.state.gameLists}
        getAllUserLists={this.getAllUserLists}
      /></Tab.Pane>
    },
    { menuItem: 'my game nights', render: () => <Tab.Pane></Tab.Pane> },
    {
      menuItem: 'my friends', render: () => <Tab.Pane><UserFriends
        friendData={this.props.friendData}
        getAllFriendData={this.props.getAllFriendData}
        searchingForFriends={this.state.searchingForFriends}
      /></Tab.Pane>
    },
    { menuItem: 'owned games', render: () => <Tab.Pane></Tab.Pane> },
    { menuItem: 'played games', render: () => <Tab.Pane></Tab.Pane> },
  ]

  handleTabChange = (e, activeIndex) => {
    this.setState({ activeIndex: activeIndex.activeIndex })
  }

  handleOnChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  // ========== Functions for Game Lists Section ==========
  getAllUserLists = () => {
    GameListManager.getAllUserLists(this.activeUser)
      .then(gameLists => {
        this.setState({
          gameLists: gameLists,
          showCreateListModal: false
        })
      })
  }

  handleSaveNewGameListBtnOnClick = () => {
    const gameListObj = {
      userId: this.activeUser,
      name: this.state.gameListName
    }
    GameListManager.addGameList(gameListObj)
      .then(this.getAllUserLists)
  }

  // ========== Functions for Game Nights Section ==========
  getAllUserGameNights = () => {
    GameNightManager.getAllUserGameNights(this.activeUser)
      .then(gameNights => {
        this.setState({
          gameNights: gameNights,
          showCreateGameNightModal: false
        })
      })
  }

  handleGameListSelectOnChange = (selection, event) => {
    const nodeName = event.target.nodeName
    let num
    if (nodeName === "DIV") {
      num = parseInt(event.target.textContent)
    } else if (nodeName === "SPAN") {
      num = parseInt(event.target.parentNode.textContent)
    }
    if (num) {
      this.setState({ [selection]: num })
    } else {
      this.setState({ [selection]: 0 })
    }
  }

  handleSaveNewGameNightBtnOnClick = () => {
    const gameNightObj = {
      userId: this.activeUser,
      name: this.state.gameNightName,
      date: this.state.gameNightDate,
      location: this.state.gameNightLocation,
      userListId: this.state.userGameListId
    }
    GameNightManager.addGameNight(gameNightObj)
      .then(this.getAllUserGameNights)
  }

  // ========== Functions for Conditional Rendering ==========
  displayAddBtnBasedOnActiveTab = () => {
    switch (this.state.activeIndex) {
      case 0:
        return this.displayAddGameListBtnAndModal()
      case 1:
        return this.displayAddGameNightBtnAndModal()
      case 2:
        return this.displayAddAFriendBtnAndModal()
      default:
        return null
    }
  }

  displayAddGameListBtnAndModal = () => {
    return <Modal
      closeIcon
      trigger={<Button onClick={() => this.setState({ showCreateListModal: true })}>create new list</Button>}
      open={this.state.showCreateListModal}>
      <Modal.Content>
        <CreateGameListForm
          handleOnChange={this.handleOnChange}
          handleSaveNewGameListBtnOnClick={this.handleSaveNewGameListBtnOnClick} />
      </Modal.Content>
    </Modal>
  }

  displayAddGameNightBtnAndModal = () => {
    return <Modal
      closeIcon
      trigger={<Button onClick={() => this.setState({ showCreateGameNightModal: true })}>create game night</Button>}
    >
      <Modal.Content>
        <CreateGameNightForm
          handleOnChange={this.handleOnChange}
          handleSaveNewGameNightBtnOnClick={this.handleSaveNewGameListBtnOnClick}
          gameLists={this.state.gameLists}
        />
      </Modal.Content>
    </Modal>
  }

  displayAddAFriendBtnAndModal = () => {
    return <Modal size="fullscreen"
      closeIcon
      trigger={<Button>add a friend</Button>}
    >
      <Modal.Content>
        <UserFriendSearch
          friendData={this.props.friendData}
          getAllFriendData={this.props.getAllFriendData}
        />
      </Modal.Content>
    </Modal>
  }

  render() {
    return (
      <>
        <div className="userProfileAdd__btn">
          {this.displayAddBtnBasedOnActiveTab()}
        </div>
        <Tab panes={this.panes}
          onTabChange={this.handleTabChange}
        />
      </>
    )
  }
}

export default UserProfileData;