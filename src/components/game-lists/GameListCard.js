import React, { Component } from 'react';
import { Image } from "semantic-ui-react";
import './GameListCard.css'

class GameNightCard extends Component {
  render() {
    return (
      <li className="gameList__card">
        <Image className="gameListCard__img" src={this.props.game.thumb_url}/>
        <h4>{this.props.game.name}</h4>
      </li>
    );
  }
}

export default GameNightCard