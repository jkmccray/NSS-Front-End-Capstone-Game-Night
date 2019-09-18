import React, { Component } from 'react';
import { Header, Input, Button, Dropdown } from "semantic-ui-react";
import './CreateGameNightForm.css'

class CreateGameNightForm extends Component {
  render() {
    return (
      <>
        <Header size="large">create new game night</Header>
        <Input label="name" className="createGameNightForm__input" fluid placeholder="Enter game night name" id="gameNightName" onChange={this.props.handleOnChange} />
        <div className="dateAndTimeInput__div">
          <Input label="date" className="createGameNightForm__input" type="date" placeholder="Choose date" id="gameNightDate" onChange={this.props.handleOnChange} />
          <Input label="time" className="createGameNightForm__input" type="time" placeholder="Choose time" id="gameNightTime" onChange={this.props.handleOnChange} />
        </div>
        <Input label="location" className="createGameNightForm__input" fluid type="address" placeholder="Enter game night location address" id="gameNightLocation" onChange={this.props.handleOnChange} />
        <Dropdown
          onChange={this.props.handleGameListSelectOnChange}
          placeholder='Select game list'
          className="search-field"
          id="selectedGameList"
          clearable
          fluid
          search
          selection
          options={
            this.props.gameLists.map(list => ({
              key: list.id,
              text: list.name,
              value: list.id,
              id: list.id,
            }))
          }></Dropdown>
        <div className="createGameNightBtn__div">
          <Button className="createGameNight__btn" onClick={this.props.handleSaveNewGameNightBtnOnClick}>save</Button>
          <Button className="createGameNight__btn" onClick={this.props.handleCancelAddGameNightBtnOnClick}>cancel</Button>
        </div>
      </>
    )
  }
}

export default CreateGameNightForm