import React, { Component } from "react";
import { withRouter } from "react-router-dom"
import { Dropdown, Button, Icon, Modal } from "semantic-ui-react";
import GameNightGameList from "./GameNightGameList"
import InviteFriends from "./InviteFriends"
import FriendsInvitedToGameNight from "../../modules/FriendsInvitedToGameNightsManager";
import GameNightManager from "../../modules/GameNightManager"
import AttendeeCard from "./AttendeeCard";
import EditGameNightForm from "./EditGameNightForm"

import "./GameNightCard.css"

class GameNightCard extends Component {
  state = {
    attendees: [],
    activeUserInviteStatus: "not attending",
    userAndGameNight: {},
    editedGameNightName: this.props.gameNight.name,
    editedGameNightDate: this.props.gameNight.date,
    editedGameNightTime: this.props.gameNight.time,
    editedGameNightLocation: this.props.gameNight.location,
    updatedGameListId: this.props.gameNight.userListId || 0,
    updatedGameListName: this.props.gameNight.userListId > 0 ? this.props.gameNight.userList.name : null,
    showEditGameNightModal: false
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))
  gameListId = this.props.gameNight.userListId
  creatorId = this.props.gameNight.userId
  gameNightId = this.props.gameNight.id

  componentDidMount() {
    this.getAttendeesAndSetState()
    this.getUserAndGameNightAndSetState()
  }

  getAttendeesAndSetState = () => {
    FriendsInvitedToGameNight.getAllUsersAttendingAGameNight(this.props.gameNight.id)
      .then(attendees => this.setState({ attendees: attendees }))
  }

  getUserAndGameNightAndSetState = () => {
    FriendsInvitedToGameNight.getSingleUserInvitedAndGameNight(this.activeUser, this.props.gameNight.id)
    .then(userAndGameNight => {
      if (userAndGameNight.length > 0) {
        this.setState({
          activeUserInviteStatus: userAndGameNight[0].inviteStatus,
          userAndGameNight: userAndGameNight[0]
        })
        }
      })
  }

  // ========== Handler Functions ==========
  handleAttendBtnOnClick = () => {
    const userAndGameNightObj = {
      userId: this.activeUser,
      gameNightId: this.props.gameNight.id,
      inviteStatus: "attending"
    }
    FriendsInvitedToGameNight.inviteFriendToGameNight(userAndGameNightObj)
      .then(this.getAttendeesAndSetState)
  }

  handleAcceptInviteBtnOnClick = () => {
    const userAndGameNightObj = this.state.userAndGameNight
    userAndGameNightObj.inviteStatus = "attending"
    FriendsInvitedToGameNight.updateInviteStatus(userAndGameNightObj)
      .then(userAndGameNightObj => this.setState({ activeUserInviteStatus: userAndGameNightObj.inviteStatus }))
  }

  handleDeclineInviteBtnOnClick = () => {
    const userAndGameNightObj = this.state.userAndGameNight
    userAndGameNightObj.inviteStatus = "not attending"
    FriendsInvitedToGameNight.updateInviteStatus(userAndGameNightObj)
      .then(userAndGameNightObj => this.setState({ activeUserInviteStatus: userAndGameNightObj.inviteStatus }))
  }

  handleOnChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleGameListSelectOnChange = (event) => {
    const nodeName = event.target.nodeName
    let userListId
    let userListName
    if (nodeName === "DIV") {
      userListId = parseInt(event.target.id)
      userListName = event.target.textContent
    } else if (nodeName === "SPAN") {
      userListId = parseInt(event.target.parentNode.id)
      userListName = event.target.parentNode.textContent
    }
    if (userListId && userListName) {
      this.setState({
        updatedGameListId: userListId,
        updatedGameListName: userListName
      })
    } else {
      this.setState({
        updatedGameListId: this.props.gameNight.userListId,
        updatedGameListName: this.props.gameNight.userList.name
      })
    }
  }

  createDateAndTimeObj = () => {
    const date = this.state.editedGameNightDate.split("-")
    const time = this.state.editedGameNightTime.split(":")
    const dateAndTimeArr = date.concat(time).map(num => parseInt(num))
    const adjustedMonth = dateAndTimeArr[1] -1
    dateAndTimeArr.splice(1,1,adjustedMonth)
    const gameNightDateAndTime = new Date(...dateAndTimeArr)
    return gameNightDateAndTime
  }

  handleSaveEditedGameNightBtnOnClick = () => {
    const editedGameNightDateAndTime = this.createDateAndTimeObj()
    const updatedGameNightObj = {
      userId: this.activeUser,
      name: this.state.editedGameNightName,
      date: this.state.editedGameNightDate,
      time: this.state.editedGameNightTime,
      date_and_time: editedGameNightDateAndTime,
      location: this.state.editedGameNightLocation,
      userListId: this.state.updatedGameListId,
      id: this.gameNightId
    }
    GameNightManager.saveEditedGameNight(updatedGameNightObj)
      .then(() => {
        this.setState({ showEditGameNightModal: false })
        this.props.getAllGameNights()
      })
  }

  handleCancelChangesBtnOnClick = () => {
    this.setState({ showEditGameNightModal: false })
  }

  // ========== Functions for Rendering ==========

  showGameListBtnOrModal = () => {
    return this.gameListId > 0
      ? <Modal
        closeIcon
        trigger={<Button className="gameNightCard__btn">view game list</Button>}
      >
        <Modal.Content>
          <GameNightGameList
            friendData={this.props.friendData}
            getAllFriendData={this.props.getAllFriendData}
            gameList={this.props.gameNight.userList}
          />
        </Modal.Content>
      </Modal>
      : null
  }

  showInviteFriendsBtnOrModal = () => {
    switch (this.state.activeUserInviteStatus) {
      case "invited":
        return <div>
          <Button
            className="gameNightCard__btn"
            onClick={this.handleAcceptInviteBtnOnClick}
          >accept</Button>
          <Button
            className="gameNightCard__btn"
            onClick={this.handleDeclineInviteBtnOnClick}
          >decline</Button>
        </div>
      case "attending":
        return <Modal
          closeIcon
          trigger={<Button className="gameNightCard__btn">invite friends</Button>}
        >
          <Modal.Content>
            <InviteFriends
              friendData={this.props.friendData}
              getAllFriendData={this.props.getAllFriendData}
              gameNightId={this.props.gameNight.id}
            />
          </Modal.Content>
        </Modal>
      default:
        return <Button onClick={this.handleAttendBtnOnClick} className="gameNightCard__btn">attend</Button>
    }
  }

  showAttendeesBtnOrModal = () => {
    return this.state.attendees.length > 0
      ? <Modal closeIcon
        trigger={<Button basic className="gameNightCardAttendees__btn">see all attendees</Button>}>
        <Modal.Content>
          {
            this.state.attendees.map(attendee => {
              return < AttendeeCard
                key={attendee.id}
                attendee={attendee.user}
              />
            })
          }
        </Modal.Content>
      </Modal>
      : null
  }

  displayEditAndDeleteMenuForActiveUser = () => {
    if (this.activeUser === this.creatorId) {
      return <Dropdown
        closeOnChange
        pointing="right"
        className="editGameNight__dropdown"
        icon={<Icon
          name="ellipsis vertical"
          size="large"
          className="editGameNight__icon" />
        }>
        <Dropdown.Menu>
          <Modal
            open={this.state.showEditGameNightModal}
            trigger={<Dropdown.Item text="edit" onClick={() => this.setState({ showEditGameNightModal: true })} />}>
            <Modal.Content>
              <EditGameNightForm
                editedGameNight={this.state}
                gameNight={this.props.gameNight}
                handleOnChange={this.handleOnChange}
                handleGameListSelectOnChange={this.handleGameListSelectOnChange}
                handleSaveEditedGameNightBtnOnClick={this.handleSaveEditedGameNightBtnOnClick}
                handleCancelChangesBtnOnClick={this.handleCancelChangesBtnOnClick} />
            </Modal.Content>
          </Modal>
          <Dropdown.Divider />
          <Dropdown.Item text="delete"
            onClick={() => this.props.handleDeleteGameNightOnClick(this.gameNightId)}
          />
        </Dropdown.Menu>
      </Dropdown>
    }
  }

  render() {
    return (
      <div className="gameNight__card">
        {this.displayEditAndDeleteMenuForActiveUser()}
        <p>{this.props.gameNight.date}, {this.props.gameNight.time}</p>
        <h3 >{this.props.gameNight.name}</h3>
        <p>created by: {this.props.gameNight.user ? this.props.gameNight.user.username : null}</p>
        <p><Icon name="point" size="large" className="gameNightLocation__icon" />{this.props.gameNight.location}</p>
        <div className="gameNight__attendees"></div>
        {this.showAttendeesBtnOrModal()}
        <div className="gameNightCardBtn__div">
          {this.showGameListBtnOrModal()}
          {this.showInviteFriendsBtnOrModal()}
        </div>
      </div>
    );
  }
}

export default withRouter(GameNightCard)