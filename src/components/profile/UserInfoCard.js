import React, { Component } from "react"
import { Image, Header } from "semantic-ui-react"
import GameNightCard from "../game-nights/GameNightCard"

import "./UserInfoCard.css"

class UserInfoCard extends Component {
  state={
    gameNight: {}
  }

  render() {
    return (
      <div className="userInfoCard__div">
        <Image circular className="profile__img" src="https://static.boredpanda.com/blog/wp-content/uploads/2018/04/handicapped-cat-rexie-the-handicat-dasha-minaeva-1-5acb4e9d44dc5__700.jpg" />
        <Header inverted className="profile__name">username</Header>
        <Header inverted>next game night:</Header>
        <div className="profileGameNight__div"> test
          {/* <GameNightCard
          gameNight={}
          /> */}
        </div>
        <div className="profileUserStats__div">
          <Header >you own __ games!</Header>
          <Header >you've played __ games!</Header>
        </div>
      </div>
    )
  }
}

export default UserInfoCard