import React, { Component } from "react";
import { Input } from "semantic-ui-react"
import FriendsInvitedToGameNight from "../../modules/FriendsInvitedToGameNightsManager";
import InviteFriendCard from './InviteFriendCard';

class InviteFriends extends Component {
  state = {
    allFriends: [],
    friendSearchMatches: []
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))
  gameNightId = this.props.gameNightId

  componentDidMount() {
    this.getAllFriendsAndSetState()
  }

  getAllFriendsAndSetState = () => {
    // Get all current friends as an array of user objects and store in a variable
    const allFriends = this.props.friendData.users.filter(user => {
      return this.props.friendData.friendships.find(friendship => user.id === friendship.userId || user.id === friendship.otherUser)
    })
    this.setState({allFriends: allFriends})
  }

  handleChange = (event) => {
    const friendSearchMatches = this.state.allFriends.filter(user => {
      return user.username.toLowerCase().includes(event.target.value.toLowerCase())
    })
    this.setState({ friendSearchMatches: friendSearchMatches })
  }

  inviteFriendToGameNight = (friendUserId) => {
    const userAndGameNightObj = {
      gameNightId: this.gameNightId,
      userId: friendUserId,
      isAttending: false
    }
    FriendsInvitedToGameNight.inviteFriendToGameNight(userAndGameNightObj)
      .then(() => {
        this.getAllFriendsAndSetState()
      })
  }

  render() {
    return (
      <section className="friendsSearch__section">
        <Input placeholder="Search for new friends" className="friendsSearch__input" id="friendsSearch_input" type="text"
          onKeyUp={this.handleChange} />
        {
          this.state.friendSearchMatches.map(user => {
            return <InviteFriendCard
              key={user.id}
              user={user}
              inviteFriendToGameNight={this.inviteFriendToGameNight}/>
          })
        }
      </section>
    )
  }
}

export default InviteFriends