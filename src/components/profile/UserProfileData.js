import React, { Component } from 'react';
import { Tab, Button } from "semantic-ui-react"
import UserFriends from "./UserFriends"
import UserGameLists from "./UserGameLists"

class UserProfileData extends Component {
  state = {
    activeIndex: 0,
    searchingForFriends: true
  }

  panes = [
    { menuItem: 'lists', render: () => <Tab.Pane><UserGameLists /></Tab.Pane> },
    { menuItem: 'game nights', render: () => <Tab.Pane></Tab.Pane> },
    {
      menuItem: 'friends', render: () => <Tab.Pane><UserFriends
        friendData={this.props.friendData}
        getAllFriendData={this.props.getAllFriendData}
        searchingForFriends={this.state.searchingForFriends}
      /></Tab.Pane>
    },
    { menuItem: 'owned games', render: () => <Tab.Pane></Tab.Pane> },
    { menuItem: 'played games', render: () => <Tab.Pane></Tab.Pane> },
  ]

  handleTabChange = (e, activeIndex) => {
    this.setState({ activeIndex: activeIndex.activeIndex })
  }

  displayButtonForAddFriendsOrCreateLists = () => {
    switch (this.state.activeIndex) {
      case 0:
        return <Button>
          create new list
      </Button>;
      case 2:
        return <Button>
        add a friend
      </Button>
    }
  }

  render() {
    return (
      <>
      <div className="userProfileAdd__btn">
        {this.displayButtonForAddFriendsOrCreateLists()}
      </div>
        <Tab panes={this.panes}
          onTabChange={this.handleTabChange}
        />
      </>
    )
  }
}

export default UserProfileData;