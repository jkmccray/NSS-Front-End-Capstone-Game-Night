import React, { Component } from "react";
import { Image } from "semantic-ui-react"
import ProfilePlaceholder from "../../images/profile_placeholder.png"

import "../profile/UserFriendSearchCard.css"

export default class AttendeeCard extends Component {
  render() {
    return (
      <div className="attendeeCard__div">
        <Image circular className="friendSearchCard__img" src={
          this.props.attendee.photoUrl
            ? this.props.attendee.photoUrl
            : ProfilePlaceholder
        } />
        <h3 className="attendeeName__h3">{this.props.attendee.username}</h3>
      </div>
    )
  }
}