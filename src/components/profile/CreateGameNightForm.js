import React, { Component } from 'react';
import { Header, Input, Button, Dropdown } from "semantic-ui-react";
// import './CreateGameNightForm.css'

class CreateGameNightForm extends Component {
  render() {
    return (
      <>
        <Header>create new game night</Header>
        <Input placeholder="Enter game night name" id="gameNightName" onChange={this.props.handleOnChange}/>
        <Input type="date" placeholder="Choose date" id="gameNightDate" onChange={this.props.handleOnChange}/>
        <Input type="time" placeholder="Choose time" id="gameNightTime" onChange={this.props.handleOnChange}/>
        <Input type="address" placeholder="Enter game night location address" id="gameNightLocation" onChange={this.props.handleOnChange}/>
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
        <Button onClick={this.props.handleSaveNewGameNightBtnOnClick}>save</Button>
        </>
    )
  }
}

export default CreateGameNightForm