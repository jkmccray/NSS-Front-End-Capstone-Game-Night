import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import { Input } from "semantic-ui-react"
import FriendsManager from "../../modules/FriendshipManager";
import FriendSearchCard from './UserFriendSearchCard';

class FriendsSearch extends Component {
  state = {
    potentialFriends: [],
    friendSearchMatches: [],
  }

  componentDidMount() {
    this.displayPotentialFriends()
  }

  searchPotentialFriendsToDisplay = () => {
    // Get all current friends as an array of user objects and store in a variable
    const currentFriends = this.props.friendData.users.filter(user => {
      return this.props.friendData.friendships.find(friendship => user.id === friendship.userId || user.id === friendship.otherUser)
    })
    // Compare users array with current friends array and return only users not included in current friends array
    const potentialFriends = this.props.friendData.users.filter(user => {
      return !currentFriends.includes(user)
    })
    return potentialFriends;
  }

  displayPotentialFriends = () => {
    this.props.getAllFriendData()
      .then(() => this.setState({ potentialFriends: this.searchPotentialFriendsToDisplay() }))
  }
  handleChange = (event) => {
    const filteredPotentialFriends = this.state.potentialFriends.filter(user => {
      return user.username.toLowerCase().includes(event.target.value.toLowerCase())
    })
    this.setState({ friendSearchMatches: filteredPotentialFriends })
  }

  addFriendship = (otherUserId) => {
    const activeUserId = parseInt(sessionStorage.getItem("activeUser"))
    const newFriendshipObj = {
      userId: activeUserId,
      otherUser: otherUserId,
      isFriend: false
    }
    FriendsManager.addFriendshipRequest(newFriendshipObj)
      .then(() => {
        this.displayPotentialFriends()
      })
  }

  render() {
    return (
      <section className="friendsSearch__section">
        <Input placeholder="Search for new friends" className="friendsSearch__input" id="friendsSearch_input" type="text"
          onKeyUp={this.handleChange} />
        {
          this.state.friendSearchMatches.map(user => {
            return <FriendSearchCard
              key={user.id}
              user={user}
              addFriendship={this.addFriendship}
              {...this.props} />
          })
        }
      </section>
    )
  }
}

export default withRouter(FriendsSearch)