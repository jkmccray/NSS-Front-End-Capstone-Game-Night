import React, { Component } from "react";
import { Button } from 'semantic-ui-react'

export default class InviteFriendCard extends Component {
    state = {
      friendInvited: false
    }

    handleInviteFriendButton = () => {
      this.props.inviteFriendToGameNight(this.props.user.id)
      this.setState({friendInvited: true})
    }

    displayInviteFriendBtn = () => {
        return this.state.friendInvited
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