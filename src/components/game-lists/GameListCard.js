import React, { Component } from 'react';
import { Image, Button, Icon } from "semantic-ui-react";
import './GameListCard.css'

class GameNightCard extends Component {
  render() {
    return (
      <li className="gameList__card">
        <div className="gameListCard__info">
        <Image className="gameListCard__img" src={this.props.gameAndListObj.apiGame.thumb_url}/>
        <h4>{this.props.gameAndListObj.apiGame.name}</h4>
        </div>
        {
          this.props.editingStatus
          ? <Button
          onClick={this.props.handleDeleteGameFromListBtnOnClick}
          className="deleteGameFromList__btn"
          id={`deleteGameFromListBtn--${this.props.gameAndListObj.id}`}><Icon name="minus circle"/></Button>
          : null
        }
      </li>
    );
  }
}

export default GameNightCard