import React, { Component } from 'react';
import FriendsList from '../friends/FriendList';

export default class FriendsSection extends Component {
  render() {
    return (
      <section>
        <header className="userFriends__header">
          <button onClick={() => {
            this.props.history.push("/friends/new")
          }}
            className="findNewFriends__btn">Add New Friends</button>
        </header>
        <FriendsList
          friendData={this.props.friendData}
          getAllFriendData={this.props.getAllFriendData}
        />
      </section>
    )
  }
}