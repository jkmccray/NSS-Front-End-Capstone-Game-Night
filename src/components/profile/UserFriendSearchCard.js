import React, { Component } from "react";
import { Button, Image } from 'semantic-ui-react'
import ProfilePlaceholder from "../../images/profile_placeholder.png"

import "./UserFriendSearchCard.css"

export default class FriendSearchCard extends Component {
    state = {
        friendRequestSent: false
    }

    handleAddFriendButton = () => {
        this.props.addFriendship(this.props.user.id)
        this.setState({ friendRequestSent: true })
    }

    displayAddFriendOrRequestSentBtn = () => {
        return this.state.friendRequestSent
            ? <Button disabled>friend request sent!</Button>
            : <Button onClick={this.handleAddFriendButton} className="addFriend__button">
                add friend
        </Button>
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
                {this.displayAddFriendOrRequestSentBtn()}
            </div>
        )
    }
}