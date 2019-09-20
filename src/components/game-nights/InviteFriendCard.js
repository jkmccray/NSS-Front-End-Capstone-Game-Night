import React, { Component } from "react";
import { Button, Image } from 'semantic-ui-react'
import ProfilePlaceholder from "../../images/profile_placeholder.png"
import FriendsInvitedToGameNight from "../../modules/FriendsInvitedToGameNightsManager";

import "../profile/UserFriendSearchCard.css"

export default class InviteFriendCard extends Component {
  state = {
    friendInvited: false,
    inviteStatus: ""
  }

  componentDidMount() {
    FriendsInvitedToGameNight.getSingleUserInvitedAndGameNight(this.props.user.id, this.props.gameNightId)
      .then(friendInvitedAndGameNightObj => {
        if (friendInvitedAndGameNightObj.length > 0) {
          this.setState({ inviteStatus: friendInvitedAndGameNightObj[0].inviteStatus })
        }
      })
  }

  handleInviteFriendButton = () => {
    this.props.inviteFriendToGameNight(this.props.user.id)
      .then(() => this.setState({ friendInvited: true }))
  }

  displayInviteFriendBtn = () => {
    if (this.state.friendInvited || this.state.inviteStatus === "invited") {
      return <Button disabled>invited!</Button>
    } else if (this.state.inviteStatus === "attending") {
      return <Button disabled>attending!</Button>
    } else {
      return <Button onClick={this.handleInviteFriendButton} className="addFriend__button">
        invite
      </Button>
    }
  }

  render() {
    return (
      <div className="friendCard__div">
        <Image circular className="friendSearchCard__img" src={
          this.props.user.photoUrl
            ? this.props.user.photoUrl
            : ProfilePlaceholder
        } />
        <h3 className="friendName__h3">{this.props.user.username}</h3>
        {this.displayInviteFriendBtn()}
      </div>
    )
  }
}