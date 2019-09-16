import React, { Component } from "react";
import { Header } from "semantic-ui-react"
import FriendshipManager from "../../modules/FriendshipManager";
import FriendCard from './FriendCard';

export default class FriendList extends Component {
    componentDidMount() {
        this.props.getAllFriendData()
      }

    deleteFriendship = friendshipId => {
        FriendshipManager.deleteFriendship(friendshipId)
        .then(() => {
            this.props.getAllFriendData()
        })
    }
    acceptFriendship = friendshipObj => {
        friendshipObj.isFriend = true
        FriendshipManager.acceptFriendship(friendshipObj)
        .then(() => {
            this.props.getAllFriendData()
        })
    }

    render() {
        return (
            <section className="friendList__section">
                {this.props.friendData.friendsWithUserInfo.length > 0
                ? this.props.friendData.friendsWithUserInfo.map(user => {
                        return <FriendCard
                            key={user.id}
                            user={user}
                            deleteFriendship={this.deleteFriendship}
                            acceptFriendship={this.acceptFriendship}
                            friendship={this.props.friendData.friendships.find(friendship => user.id === friendship.userId || user.id === friendship.otherUser)}
                            {...this.props} />
                    })
                    : <Header>Select the "add a friend" button to add friends!</Header>
                }
            </section>
        )
    }
}