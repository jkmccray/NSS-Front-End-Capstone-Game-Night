import React, { Component } from "react"
import { Image, Header, Icon } from "semantic-ui-react"


import "./UserInfoCard.css"

class UserInfoCard extends Component {

  componentDidMount() {
    this.props.getActiveUserName()
    this.props.getNextGameNight()
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))

  render() {
    return (
      <div className="userInfoCard__div">
        <Image circular className="profile__img" src="https://static.boredpanda.com/blog/wp-content/uploads/2018/04/handicapped-cat-rexie-the-handicat-dasha-minaeva-1-5acb4e9d44dc5__700.jpg" />
        <Header inverted className="profile__name">{this.props.username}</Header>
        {
          this.props.gameNight.date && this.props.gameNight.time && this.props.gameNight.name
          ? <><Header inverted>next game night:</Header>
            <div className="profileGameNight__div">
              <p>{this.props.gameNight.date}, {this.props.gameNight.time}</p>
              <h3>{this.props.gameNight.name}</h3>
              <p>created by: {this.props.gameNight.user ? this.props.gameNight.user.username : null}</p>
              <p><Icon name="point" size="large" className="gameNightLocation__icon" />{this.props.gameNight.location}</p>
            </div></>
            : null
        }

        <div className="profileUserStats__div">
          <Header >you own __ games!</Header>
          <Header >you've played __ games!</Header>
        </div>
      </div>
    )
  }
}

export default UserInfoCard