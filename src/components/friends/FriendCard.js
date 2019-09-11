import React, { Component } from "react";
import { Button } from 'semantic-ui-react'

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
                <h3 className="friendName__h3">{this.props.user.username}</h3>

                {
                    this.props.friendship.isFriend
                    ? <Button onClick={() => this.props.deleteFriendship(this.props.friendship.id)} className="deleteFriend__button btn btn-sm btn-danger card-link">Delete</Button>
                    :
                    this.props.friendship.userId === this.activeUser
                    ? <Button className="pendingFriends__btn"disabled>Pending</Button>
                    : <> <Button onClick={() => this.props.acceptFriendship(this.props.friendship)} className="acceptFriend__btn">Accept Request</Button>
                    <Button onClick={() => this.props.deleteFriendship(this.props.friendship.id)} className="denyFriend__btn">Deny Request</Button> </>
                }
                </div>
            </div>
        )
    }
}