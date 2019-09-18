import React, { Component } from 'react';
import { Image, Icon } from "semantic-ui-react";
import './GameListCard.css'

class GameListCard extends Component {
  render() {
    return (
      <li className="gameList__card">
        <div className="gameListCard__info">
        <Image className="gameListCard__img" src={this.props.obj.apiGame.thumb_url}/>
        <h4 className="gameListCard__name">{this.props.obj.apiGame.name}</h4>
        </div>
        {
          this.props.editingStatus
          ? <Icon className="deleteGameFromList__icon"
          onClick={(evt) => this.props.handleDeleteGameFromListBtnOnClick(evt, this.props.gameAndListObj.id)}
            name="minus circle"
            />
          : null
        }
      </li>
    );
  }
}

export default GameListCard