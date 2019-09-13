import React, { Component } from 'react';
import { Tab, Button, Modal } from "semantic-ui-react"
import UserFriends from "./UserFriends"
import UserGameLists from "./UserGameLists"
import UserFriendSearch from "./UserFriendSearch"
import CreateGameListForm from './CreateGameListForm';
import CreateGameNightForm from './CreateGameNightForm';
import GameListManager from "../../modules/UserGameListManager"
import GameNightManager from "../../modules/GameNightManager"
import UserGameNights from "./UserGameNights"

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
    gameNightTime: "",
    gameNightLocation: "",
    userGameListId: 0,
    gameNights: []
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))

  // ========== Array of Tab Panes ==========
  panes = [
    {
      menuItem: 'my game lists', render: () => <Tab.Pane><UserGameLists
        gameLists={this.state.gameLists}
        getAllUserLists={this.getAllUserLists}
      /></Tab.Pane>
    },
    {
      menuItem: 'my game nights', render: () => <Tab.Pane><UserGameNights
        gameNights={this.state.gameNights}
        getAllUserGameNights={this.getAllUserGameNights}
      /></Tab.Pane>
    },
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

  // ========== Handler Functions ==========
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

  handleGameListSelectOnChange = (event) => {
    const nodeName = event.target.nodeName
    let userGameListId
    if (nodeName === "DIV") {
      userGameListId = parseInt(event.target.id)
    } else if (nodeName === "SPAN") {
      userGameListId = parseInt(event.target.parentNode.id)
    }
    if (userGameListId) {
      this.setState({ userGameListId: userGameListId })
    } else {
      this.setState({ userGameListId: 0 })
    }
  }

  handleSaveNewGameNightBtnOnClick = () => {
    const gameNightObj = {
      userId: this.activeUser,
      name: this.state.gameNightName,
      date: this.state.gameNightDate,
      time: this.state.gameNightTime,
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
      open={this.state.showCreateGameNightModal}>
      <Modal.Content>
        <CreateGameNightForm
          handleOnChange={this.handleOnChange}
          handleGameListSelectOnChange={this.handleGameListSelectOnChange}
          handleSaveNewGameNightBtnOnClick={this.handleSaveNewGameNightBtnOnClick}
          gameLists={this.state.gameLists}
        />
      </Modal.Content>
    </Modal>
  }

  displayAddAFriendBtnAndModal = () => {
    return <Modal size="fullscreen"
      closeIcon
      trigger={<Button>add a friend</Button>}>
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