import React, { Component } from "react";

export default class AttendeeCard extends Component {
  render() {
    return (
      <div className="attendeeCard__div">
        <h3 className="attendeeName__h3">{this.props.attendee.username}</h3>
      </div>
    )
  }
}