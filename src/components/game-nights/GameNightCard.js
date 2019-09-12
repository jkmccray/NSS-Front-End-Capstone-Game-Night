import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { Dropdown, Button, Icon, Modal } from "semantic-ui-react";
import GameNightGameList from "./GameNightGameList"
import InviteFriends from "./InviteFriends"
import FriendsInvitedToGameNight from "../../modules/FriendsInvitedToGameNightsManager";
import AttendeeCard from './AttendeeCard';

import './GameNightCard.css'

class GameNightCard extends Component {
  state = {
    attendees: []
  }

  gameListId = this.props.gameNight.userListId

  componentDidMount() {
    FriendsInvitedToGameNight.getAllUsersAttendingAGameNight(this.props.gameNight.id)
      .then(attendees => this.setState({ attendees: attendees }))
  }

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
  }

  showAttendeesLinkOrModal = () => {
    return <Modal
      closeIcon
      trigger={<Button basic className="gameNightCardAttendees__link">see all attendees</Button>}
    >
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

  render() {
    return (
      <div className="gameNight__card">
        <Dropdown
          pointing="right"
          className="editGameNight__dropdown"
          icon={<Icon
            name="ellipsis vertical"
            size="large"
            className="editGameList__icon"
          />}>
          <Dropdown.Menu>
            <Dropdown.Item text="edit"
            // onClick={this.handleEditListOnClick}
            />
            <Dropdown.Divider />
            <Dropdown.Item text="delete"
            // onClick={() => this.props.handleDeleteListOnClick(this.listId)}
            />
          </Dropdown.Menu>
        </Dropdown>
        <p>{this.props.gameNight.date}, {this.props.gameNight.time}</p>
        <h3>{this.props.gameNight.name}</h3>
        <p>created by: {this.props.gameNight.user.username}</p>
        <p><Icon name="point" size="large" className="gameNightLocation__icon" />{this.props.gameNight.location}</p>
        <div className="gameNight__attendees"></div>
        {
          this.state.attendees.length > 0
            ? this.showAttendeesLinkOrModal()
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