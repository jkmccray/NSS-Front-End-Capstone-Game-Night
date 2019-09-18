import React, { Component } from 'react';
import { Header, Input, Button, Dropdown } from "semantic-ui-react";
import GameListManager from "../../modules/UserGameListManager"

import '../profile/CreateGameNightForm.css'

class EditGameNightForm extends Component {
  state = {
    gameLists: []
  }

  componentDidMount() {
    this.getAllUserLists()
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))

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
        <Header size="large">edit game night</Header>
        <Input label="name" className="createGameNightForm__input" fluid defaultValue={this.props.gameNight.name} id="editedGameNightName" onChange={this.props.handleOnChange} />
        <div className="dateAndTimeInput__div">

          <Input label="date" className="createGameNightForm__input" defaultValue={this.props.gameNight.date} type="date" id="editedGameNightDate" onChange={this.props.handleOnChange} />
          <Input label="time" className="createGameNightForm__input" defaultValue={this.props.gameNight.time} type="time" id="editedGameNightTime" onChange={this.props.handleOnChange} />
        </div>
        <Input label="location" className="createGameNightForm__input" fluid defaultValue={this.props.gameNight.location} type="address" id="editedGameNightLocation" onChange={this.props.handleOnChange} />
        <Dropdown
          defaultValue={this.props.editedGameNight.updatedGameListId}
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
        <div className="createGameNightBtn__div">
          <Button className="editGameNight__btn" onClick={this.props.handleSaveEditedGameNightBtnOnClick}>save changes</Button>
          <Button className="createGameNight__btn" onClick={this.props.handleCancelChangesBtnOnClick}>cancel</Button>
        </div>
      </>
    )
  }
}

export default EditGameNightForm