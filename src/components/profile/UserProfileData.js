import React, { Component } from 'react';
import { Tab, Button, Modal } from "semantic-ui-react"
import UserFriends from "./UserFriends"
import UserGameLists from "./UserGameLists"
import UserFriendSearch from "./UserFriendSearch"
import CreateGameListForm from './CreateGameListForm';
import GameLists from "../../modules/UserGameListManager"


class UserProfileData extends Component {
  state = {
    activeIndex: 0,
    searchingForFriends: false,
    showCreateListModal: false,
    gameLists: []
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))

  panes = [
    {
      menuItem: 'lists', render: () => <Tab.Pane><UserGameLists
        gameLists={this.state.gameLists}
        getAllUserLists={this.getAllUserLists}
      /></Tab.Pane>
    },
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

  handleOnChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  getAllUserLists = () => {
    GameLists.getAllUserLists(this.activeUser)
      .then(gameLists => {
        this.setState({
          gameLists: gameLists,
          showCreateListModal: false
        })
      })
  }

  handleSaveNewGameListBtnOnClick = () => {
    const gameListObj = {
      userId: this.activeUser,
      name: this.state.gameListName
    }
    GameLists.addGameList(gameListObj)
      .then(this.getAllUserLists)
  }

  displayButtonForAddFriendsOrCreateLists = () => {
    switch (this.state.activeIndex) {
      case 0:
        return <Modal
          closeIcon
          trigger={<Button onClick={() => this.setState({ showCreateListModal: true })}>create new list</Button>}
          open={this.state.showCreateListModal}>
          <Modal.Content>
            <CreateGameListForm
              handleOnChange={this.handleOnChange}
              handleSaveNewGameListBtnOnClick={this.handleSaveNewGameListBtnOnClick} />
          </Modal.Content>
        </Modal>
      case 1:
        return <Button>create game night</Button>
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