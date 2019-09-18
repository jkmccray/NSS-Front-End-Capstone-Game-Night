import React, { Component } from 'react';
import { Image, Icon } from "semantic-ui-react";
import '../game-lists/GameListCard.css'

class GameListCard extends Component {
  render() {
    return (
      <li className="gameList__card">
        <div className="gameListCard__info">
        <Image className="gameListCard__img" src={this.props.game.apiGame.thumb_url}/>
        <h4 className="gameListCard__name">{this.props.game.apiGame.name}</h4>
        </div>
      </li>
    );
  }
}

export default GameListCard