import React, { Component } from "react";
import { Button } from 'semantic-ui-react'

export default class FriendSearchCard extends Component {
    state = {
      friendRequestSent: false
    }

    handleAddFriendButton = () => {
      this.props.addFriendship(this.props.user.id)
      this.setState({friendRequestSent: true})
    }

    displayAddFriendOrRequestSentBtn = () => {
        return this.state.friendRequestSent
        ? <Button disabled success>friend request sent!</Button>
        : <Button onClick={this.handleAddFriendButton} className="addFriend__button">
        add friend
        </Button>
    }

    render() {
        return (
            <div className="friendCard__div">
                <h3 className="friendName__h3">{this.props.user.username}</h3>
                {this.displayAddFriendOrRequestSentBtn()}
            </div>
        )
    }
}