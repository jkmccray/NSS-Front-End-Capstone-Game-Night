import React, { Component } from 'react';
import { Header, Input, Button, Dropdown } from "semantic-ui-react";
import GameListManager from "../../modules/UserGameListManager"

// import './EditGameNightForm.css'

class EditGameNightForm extends Component {
  state = {
    gameLists: []
  }

  componentDidMount() {
    console.log(this.props.gameNight)
    this.getAllUserLists()
  }

  activeUser=parseInt(sessionStorage.getItem("activeUser"))

  getAllUserLists = () => {
    GameListManager.getAllUserLists(this.activeUser)
      .then(gameLists => {
        this.setState({
          gameLists: gameLists,
        })
      })
  }

  render() {

    return (
      <>
        <Header>edit game night</Header>
        <Input defaultValue={this.props.gameNight.name} id="editedGameNightName" onChange={this.props.handleOnChange} />
        <Input defaultValue={this.props.gameNight.date} type="date" id="editedGameNightDate" onChange={this.props.handleOnChange} />
        <Input defaultValue={this.props.gameNight.time} type="time" id="editedGameNightTime" onChange={this.props.handleOnChange} />
        <Input defaultValue={this.props.gameNight.location} type="address" id="editedGameNightLocation" onChange={this.props.handleOnChange} />
        <Dropdown
        defaultValue={this.props.gameNight.userList.id}
          onChange={this.props.handleGameListSelectOnChange}
          placeholder='Select game list'
          className="search-field"
          id="selectedGameList"
          clearable
          fluid
          search
          selection
          options={
            this.state.gameLists.map(list => ({
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

export default EditGameNightForm