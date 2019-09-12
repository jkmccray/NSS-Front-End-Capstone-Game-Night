import React, { Component } from 'react';
import { Tab, Button, Modal } from "semantic-ui-react"
import UserFriends from "./UserFriends"
import UserGameLists from "./UserGameLists"
import UserFriendSearch from "./UserFriendSearch"

class UserProfileData extends Component {
  state = {
    activeIndex: 0,
    searchingForFriends: false
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
        return <Modal size="fullscreen"
          closeIcon
          trigger={<Button>add a friend</Button>}
        >
          <Modal.Content>
            <UserFriendSearch
              friendData={this.props.friendData}
              getAllFriendData={this.props.getAllFriendData}
            />
          </Modal.Content>
        </Modal>
      default:
        return null
    }
  }

  displayFriendSearchModal = () => {
    return <Modal
    >
      <UserFriendSearch
        friendData={this.props.friendData}
        getAllFriendData={this.props.getAllFriendData}
      />
    </Modal>
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