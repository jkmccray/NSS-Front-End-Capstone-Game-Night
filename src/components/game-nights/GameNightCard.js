import React, { Component } from "react";
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
    editedGameNightName: "",
    editedGameNightDate: "",
    editedGameNightTime: "",
    editedGameNightLocation: ""
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))
  gameListId = this.props.gameNight.userListId
  creatorId = this.props.gameNight.userId
  gameNightId = this.props.gameNight.id

  componentDidMount() {
    this.getAttendeesAndSetState()
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

  getAttendeesAndSetState = () => {
    FriendsInvitedToGameNight.getAllUsersAttendingAGameNight(this.props.gameNight.id)
      .then(attendees => this.setState({ attendees: attendees }))
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

  // ========== Functions for Rendering ==========

  showGameListBtnOrModal = () => {
    return <Modal
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
    return <Modal closeIcon
      trigger={<Button basic className="gameNightCardAttendees__link">see all attendees</Button>}>
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
  }

  displayEditAndDeleteMenuForActiveUser = () => {
    if (this.activeUser === this.creatorId) {
      return <Dropdown
        pointing="right"
        className="editGameNight__dropdown"
        icon={<Icon
          name="ellipsis vertical"
          size="large"
          className="editGameNight__icon"/>
          }>
        <Dropdown.Menu>
          <Modal
            closeIcon
            trigger={<Dropdown.Item text="edit" />}>
            <Modal.Content>
              <EditGameNightForm
                gameNight={this.props.gameNight}
                handleOnChange={this.handleOnChange}/>
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
        <h3>{this.props.gameNight.name}</h3>
        <p>created by: {this.props.gameNight.user.username}</p>
        <p><Icon name="point" size="large" className="gameNightLocation__icon" />{this.props.gameNight.location}</p>
        <div className="gameNight__attendees"></div>
        {
          this.state.attendees.length > 0
            ? this.showAttendeesBtnOrModal()
            : null
        }
        <div className="gameNightCardBtn__div">
          {this.showGameListBtnOrModal()}
          {this.showInviteFriendsBtnOrModal()}
        </div>
      </div>
    );
  }
}

export default GameNightCard