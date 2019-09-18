import React, { Component } from 'react';
import { Header, Input, Button } from "semantic-ui-react";
import './CreateGameListForm.css'

class CreateGameListForm extends Component {
  render() {
    return (
      <>
        <Header size="large" className="createGameListForm__header">create new game list</Header>
        <Input focus className="createGameListForm__input" fluid placeholder="Enter list name" id="gameListName" onChange={this.props.handleOnChange} />
        <div className="createGameListFormBtn__div">
          <Button className="createGameListForm__btn" onClick={this.props.handleSaveNewGameListBtnOnClick}>save</Button>
          <Button className="createGameListForm__btn" onClick={this.props.handleCancelAddListBtnOnClick}>cancel</Button>
        </div>
      </>
    );
  }
}

export default CreateGameListForm