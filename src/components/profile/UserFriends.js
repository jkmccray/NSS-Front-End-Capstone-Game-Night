import React, { Component } from 'react';
import FriendsList from '../friends/FriendList';
import UserFriendSearch from './UserFriendSearch'

export default class FriendsSection extends Component {
  searchingForFriends = this.props.searchingForFriends

  render() {
    return (
      <section>
        {
          this.searchingForFriends
          ? <UserFriendSearch
          friendData={this.props.friendData}
          getAllFriendData={this.props.getAllFriendData}
          />
          : <FriendsList
          friendData={this.props.friendData}
          getAllFriendData={this.props.getAllFriendData}
        />
        }
      </section>
    )
  }
}