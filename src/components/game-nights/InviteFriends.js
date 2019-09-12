import React, { Component } from "react";
import { Input } from "semantic-ui-react"
import FriendsInvitedToGameNight from "../../modules/FriendsInvitedToGameNightsManager";
import InviteFriendCard from './InviteFriendCard';

class InviteFriends extends Component {
  state = {
    friendSearchMatches: []
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))
  gameNightId = this.props.gameNightId

  handleChange = (event) => {
    const friendSearchMatches = this.props.friendData.acceptedFriends.filter(user => {
      return user.username.toLowerCase().includes(event.target.value.toLowerCase())
    })
    this.setState({ friendSearchMatches: friendSearchMatches })
  }

  inviteFriendToGameNight = (friendUserId) => {
    const userAndGameNightObj = {
      gameNightId: this.gameNightId,
      userId: friendUserId,
      inviteStatus: "invited"
    }
    return FriendsInvitedToGameNight.inviteFriendToGameNight(userAndGameNightObj)
  }

  render() {
    return (
      <section className="friendsSearch__section">
        <Input placeholder="Search for friends to invite" className="friendsSearch__input" id="friendsSearch_input" type="text"
          onKeyUp={this.handleChange} />
        {
          this.state.friendSearchMatches.map(user => {
            return <InviteFriendCard
              key={user.id}
              user={user}
              inviteFriendToGameNight={this.inviteFriendToGameNight}
              gameNightId={this.gameNightId}/>
          })
        }
      </section>
    )
  }
}

export default InviteFriends