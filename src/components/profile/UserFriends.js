import React, { Component } from 'react';
import FriendsList from '../friends/FriendList';
import UserFriendSearch from './UserFriendSearch'

export default class UserFriends extends Component {
  searchingForFriends = this.props.searchingForFriends

  render() {
    return (
      <section>
        <FriendsList
          friendData={this.props.friendData}
          getAllFriendData={this.props.getAllFriendData}
        />
      </section>
    )
  }
}