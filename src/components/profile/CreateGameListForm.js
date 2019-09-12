import React, { Component } from 'react';
import { Header, Input, Button } from "semantic-ui-react";
// import './CreateGameListForm.css'

class CreateGameListForm extends Component {
  render() {
    return (
      <>
        <Header>game list name</Header>
        <Input id="gameListName" onChange={this.props.handleOnChange}/>
        <Button onClick={this.props.handleSaveNewGameListBtnOnClick}>save</Button>
      </>
    );
  }
}

export default CreateGameListForm