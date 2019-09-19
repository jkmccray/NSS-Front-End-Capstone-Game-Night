import React, { Component } from "react";
import { Button, Image } from 'semantic-ui-react'
import ProfilePlaceholder from "../../images/profile_placeholder.png"

import "./FriendCard.css"

export default class FriendCard extends Component {
    state = {
        friendshipId: 0
    }

    componentDidMount() {
        this.setState({ friendshipId: this.props.friendship.id })
    }

    activeUser = parseInt(sessionStorage.getItem("activeUser"))

    render() {
        return (
            <div className="friendCard__div">
                <div className="friendCard__body">
                    <Image className="friendCard__img" size="small" circular src={
                        this.props.user.photoUrl
                        ? this.props.user.photoUrl
                        : ProfilePlaceholder
                        } />

                    <h3 className="friendName__h3">{this.props.user.username}</h3>

                    {
                        this.props.friendship.isFriend
                            ? <Button onClick={() => this.props.deleteFriendship(this.props.friendship.id)} className="deleteFriend__button">delete</Button>
                            :
                            this.props.friendship.userId === this.activeUser
                                ? <Button className="pendingFriends__btn" disabled>pending</Button>
                                : <> <Button onClick={() => this.props.acceptFriendship(this.props.friendship)} className="acceptFriend__btn friend__btn">accept</Button>
                                    <Button onClick={() => this.props.deleteFriendship(this.props.friendship.id)} className="denyFriend__btn friend__btn">deny</Button> </>
                    }
                </div>
            </div>
        )
    }
}