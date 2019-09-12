import React, { Component } from 'react';
import { Dropdown, Button, Icon } from "semantic-ui-react";
import './GameNightCard.css'

class GameNightCard extends Component {


  render() {
    return (
      <div className="gameNight__card">
        <Dropdown
          pointing="right"
          className="editGameNight__dropdown"
          icon={<Icon
            name="ellipsis vertical"
            size="large"
            className="editGameList__icon"
          />}>
          <Dropdown.Menu>
            <Dropdown.Item text="edit"
            // onClick={this.handleEditListOnClick}
            />
            <Dropdown.Divider />
            <Dropdown.Item text="delete"
            // onClick={() => this.props.handleDeleteListOnClick(this.listId)}
            />
          </Dropdown.Menu>
        </Dropdown>
        <p>{this.props.gameNight.date}, {this.props.gameNight.time}</p>
        <h3>{this.props.gameNight.name}</h3>
        <p>{this.props.gameNight.user.username}</p>
        <p><Icon name="point" size="large" className="gameNightLocation__icon" />{this.props.gameNight.location}</p>
        <div className="gameNight__attendees"></div>
        <p>see all attendees</p>
        <div className="gameNightCardBtn__div">
          <Button color="yellow" className="gameNightCard__btn"

          >view game list</Button>
          <Button color="yellow" className="gameNightCard__btn">invite friends</Button>
        </div>
      </div>
    );
  }
}

export default GameNightCard