import React, { Component } from 'react';
import { Image, Header, Rating, Button, Icon } from "semantic-ui-react";
// import './GameDetails.css'

class GameDetails extends Component {
  render() {
    return (
      <div className="gameDetails__div">
        <div className="gameDetails__imgAndDesc">
          <Image src="#" />
          <div className="gameNameAndDesc__div">
            <Header>Game Name</Header>
            <Rating defaultRating={4} maxRating={5} disabled />
            <Header>description</Header>
            <p>game description from db</p>
          </div>
        </div>
        <div className="moreGameInfo__div">
          
        </div>
      </div>
    )
  }

}

export default GameDetails