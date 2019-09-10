import React, { Component } from 'react';
import { Link, withRouter, NavLink } from "react-router-dom"
import { Tab } from "semantic-ui-react"
import UserFriends from "./UserFriends"
import UserGameLists from "./UserGameLists"

class UserProfileData extends Component {
  render() {
    return (
      <>
        <Tab panes={
          [
            { menuItem: 'lists', render: () => <Tab.Pane><UserGameLists /></Tab.Pane> },
            { menuItem: 'game nights', render: () => <Tab.Pane></Tab.Pane> },
            { menuItem: 'friends', render: () => <Tab.Pane><UserFriends /></Tab.Pane> },
            { menuItem: 'owned games', render: () => <Tab.Pane></Tab.Pane> },
            { menuItem: 'played games', render: () => <Tab.Pane></Tab.Pane> },
          ]
        } />
      </>
    )
  }
}

export default withRouter(UserProfileData);