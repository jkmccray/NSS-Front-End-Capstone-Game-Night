import React, { Component } from 'react';
import { Tab, Button, Modal } from "semantic-ui-react"
import UserFriends from "./UserFriends"
import UserGameLists from "./UserGameLists"
import UserFriendSearch from "./UserFriendSearch"
import CreateGameListForm from './CreateGameListForm';
import CreateGameNightForm from './CreateGameNightForm';
import GameListManager from "../../modules/UserGameListManager"
import GameNightManager from "../../modules/GameNightManager"
import GameNights from "../game-nights/GameNights"
import FriendsInvitedToGameNight from "../../modules/FriendsInvitedToGameNightsManager";
import OwnedPlayedList from "./OwnedPlayedList"

import "./UserProfileData.css"

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
    gameNightDateAndTime: {},
    gameNightLocation: "",
    userGameListId: 0,
    gameNights: [],
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))

  // ========== Array of Tab Panes ==========
  panes = [
    {
      menuItem: 'my game lists', render: () => <Tab.Pane className="profile__tab"><UserGameLists
        gameLists={this.state.gameLists}
        getAllUserLists={this.getAllUserLists}
      /></Tab.Pane>
    },
    {
      menuItem: 'my game nights', render: () => <Tab.Pane className="profile__tab"><GameNights
        friendData={this.props.friendData}
        getAllFriendData={this.props.getAllFriendData}
        gameNights={this.state.gameNights}
        getAllUserGameNights={this.getAllUserGameNights}
      /></Tab.Pane>
    },
    {
      menuItem: 'my friends', render: () => <Tab.Pane className="profile__tab"><UserFriends
        friendData={this.props.friendData}
        getAllFriendData={this.props.getAllFriendData}
        searchingForFriends={this.state.searchingForFriends}
      /></Tab.Pane>
    },
    { menuItem: 'owned games', render: () => <Tab.Pane className="profile__tab"><OwnedPlayedList
    activeIndex={this.state.activeIndex}
    /></Tab.Pane> },
    { menuItem: 'played games', render: () => <Tab.Pane className="profile__tab"><OwnedPlayedList
    activeIndex={this.state.activeIndex}
    /></Tab.Pane> },
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
    if (this.state.gameListName) {
      const gameListObj = {
        userId: this.activeUser,
        name: this.state.gameListName
      }
      GameListManager.addGameList(gameListObj)
        .then(this.getAllUserLists)
    } else {
      alert("please fill out name field")
    }
  }

  handleCancelAddListBtnOnClick = () => {
    this.setState({ showCreateListModal: false })
  }

  // ========== Functions for Game Nights Section ==========
  today = new Date()

  getAllUserGameNights = () => {
    GameNightManager.getAllUserGameNights(this.activeUser)
      .then(unfilteredGameNights => {
        const gameNights = unfilteredGameNights.filter(gameNight => new Date(gameNight.date_and_time) > this.today)
        this.setState({
          gameNights: gameNights,
          showCreateGameNightModal: false
        })
        this.props.getNextGameNight()
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

  createDateAndTimeObj = () => {
    const date = this.state.gameNightDate.split("-")
    const time = this.state.gameNightTime.split(":")
    const dateAndTimeArr = date.concat(time).map(num => parseInt(num))
    const adjustedMonth = dateAndTimeArr[1] -1
    dateAndTimeArr.splice(1,1,adjustedMonth)
    const gameNightDateAndTime = new Date(...dateAndTimeArr)
    return gameNightDateAndTime
  }

  handleSaveNewGameNightBtnOnClick = () => {
    if (this.state.gameNightName && this.state.gameNightDate && this.state.gameNightTime && this.state.gameNightLocation && this.state.userGameListId){
      const gameNightDateAndTime = this.createDateAndTimeObj()
      const gameNightObj = {
        userId: this.activeUser,
        name: this.state.gameNightName,
        date: this.state.gameNightDate,
        time: this.state.gameNightTime,
        date_and_time: gameNightDateAndTime,
        location: this.state.gameNightLocation,
        userListId: this.state.userGameListId
      }
      GameNightManager.addGameNight(gameNightObj)
        .then(gameNightObj => {
          const activeUserAndGameNightObj = {
            gameNightId: gameNightObj.id,
            userId: this.activeUser,
            inviteStatus: "attending"
          }
          FriendsInvitedToGameNight.inviteFriendToGameNight(activeUserAndGameNightObj)
          this.getAllUserGameNights()
        })
    } else {
      alert ("please fill out all fields")
    }
  }

  handleCancelAddGameNightBtnOnClick = () => {
    this.setState({ showCreateGameNightModal: false })
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
    return <Modal className="createGameList__modal"
      trigger={<Button className="profileAdd__btn" onClick={() => this.setState({ showCreateListModal: true })}>create new list</Button>}
      open={this.state.showCreateListModal}>
      <Modal.Content>
        <CreateGameListForm
          handleOnChange={this.handleOnChange}
          handleSaveNewGameListBtnOnClick={this.handleSaveNewGameListBtnOnClick}
          handleCancelAddListBtnOnClick={this.handleCancelAddListBtnOnClick}
        />
      </Modal.Content>
    </Modal>
  }

  displayAddGameNightBtnAndModal = () => {
    return <Modal className="createGameNight__modal"
      trigger={<Button className="profileAdd__btn" onClick={() => this.setState({ showCreateGameNightModal: true })}>create game night</Button>}
      open={this.state.showCreateGameNightModal}>
      <Modal.Content>
        <CreateGameNightForm
          handleOnChange={this.handleOnChange}
          handleDatePicker={this.handleDatePicker}
          handleGameListSelectOnChange={this.handleGameListSelectOnChange}
          handleSaveNewGameNightBtnOnClick={this.handleSaveNewGameNightBtnOnClick}
          handleCancelAddGameNightBtnOnClick={this.handleCancelAddGameNightBtnOnClick}
          gameLists={this.state.gameLists}
        />
      </Modal.Content>
    </Modal>
  }

  displayAddAFriendBtnAndModal = () => {
    return <Modal size="fullscreen"
      closeIcon
      trigger={<Button className="profileAdd__btn">add a friend</Button>}>
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
      <div className="userProfileData__div">
        <div className="userProfileAddBtn__div">
          {this.displayAddBtnBasedOnActiveTab()}
        </div>
        <Tab panes={this.panes}
          onTabChange={this.handleTabChange}
        />
      </div>
    )
  }
}

export default UserProfileData;