import React, { Component } from "react";
import { Button } from 'semantic-ui-react'
import FriendsInvitedToGameNight from "../../modules/FriendsInvitedToGameNightsManager";

export default class InviteFriendCard extends Component {
  state = {
    friendInvited: false,
    inviteStatus: ""
  }

  componentDidMount() {
    FriendsInvitedToGameNight.getSingleUserInvitedAndGameNight(this.props.user.id, this.props.gameNightId)
    .then(friendInvitedAndGameNightObj => {
      if (friendInvitedAndGameNightObj.length > 0) {
        this.setState({inviteStatus: friendInvitedAndGameNightObj[0].inviteStatus})
      }
    })
  }

  handleInviteFriendButton = () => {
    this.props.inviteFriendToGameNight(this.props.user.id)
      .then(() => this.setState({ friendInvited: true }))
  }

  displayInviteFriendBtn = () => {
    return (this.state.friendInvited || this.state.inviteStatus === "invited")
      ? <Button disabled>invited!</Button>
      : <Button onClick={this.handleInviteFriendButton} className="addFriend__button">
        invite
        </Button>
  }

  render() {
    return (
      <div className="friendCard__div">
        <h3 className="friendName__h3">{this.props.user.username}</h3>
        {this.displayInviteFriendBtn()}
      </div>
    )
  }
}