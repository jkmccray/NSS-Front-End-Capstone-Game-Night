import React, { Component } from 'react';
import { Header, Input, Button } from "semantic-ui-react";
// import './CreateGameListForm.css'

class CreateGameListForm extends Component {
  render() {
    return (
      <>
        <Header>create new game list</Header>
        <Input error={false} placeholder="Enter list name" id="gameListName" onChange={this.props.handleOnChange}/>
        <Button onClick={this.props.handleSaveNewGameListBtnOnClick}>save</Button>
        <Button onClick={this.props.handleCancelAddListBtnOnClick}>cancel</Button>
      </>
    );
  }
}

export default CreateGameListForm