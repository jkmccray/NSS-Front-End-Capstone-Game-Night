import React, { Component } from "react"
import { Image, Header, Icon } from "semantic-ui-react"


import "./UserInfoCard.css"
import "../game-nights/GameNightCard.css"

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
            ? <><Header className="nextGameNight__header" inverted>next game night:</Header>
              <div className="profileGameNight__div">
                <p className="gameNightCard__date">{new Date(this.props.gameNight.date).toDateString().toUpperCase()}, {new Date(this.props.gameNight.date_and_time).toLocaleTimeString(undefined, { timeStyle: "short" })}</p>
                <h3>{this.props.gameNight.name}</h3>
                <p>created by: {this.props.gameNight.user ? this.props.gameNight.user.username : null}</p>
                <div className="gameNightCardLocation__div"><Icon name="point" size="large" className="gameNightCardLocation__icon" /><p className="gameNightCardLocation__text">{this.props.gameNight.location}</p></div>
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