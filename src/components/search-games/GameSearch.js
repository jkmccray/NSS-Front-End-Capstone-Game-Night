import React, { Component } from "react"
import { Input, Dropdown, Button, Modal, Header } from "semantic-ui-react"
import SearchForm from "./SearchForm"
import generate from "@babel/generator"
import APIGameManager from "../../modules/APIGameManager"

// import "./GameSearch.css"

class SearchGames extends Component {
  state={
    gameNameSearch: "",
    selectedCategories: [],
    selectedMechanics: [],
    selectedMinPlayers: 0,
    selectedMaxPlaytime: "",
    searchResults:[],
    loadingStatus: false
  }

  handleOnChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleMultiSelectChange = (multiSelect, event) => {
    const arr = this.state[multiSelect]
    // if event target id exists, the category is being added to the search
    if (event.target.id){
      const newObj = {
        name: event.target.textContent,
        id: event.target.id
      }
      arr.push(newObj)
      this.setState({[multiSelect]: arr})
      // if event target id does not exist, the category is being removed from the search
    } else {
      const name = event.target.parentNode.textContent
      // use the text content of the parent node to identify which tag is being removed and remove the corresponding element in the array in state
      const i = arr.map(element => element.name).indexOf(name)
      arr.splice(i, 1)
      this.setState({[multiSelect]: arr})
    }
  }

  handleSingleSelectChange = (selection, event) => {
    const num = parseInt(event.target.textContent)
    this.setState({[selection]: num})
  }

  handleSearchButton = (event) => {
    const searchParameters = {
      name: this.state.gameNameSearch,
      categories: this.state.selectedCategories.map(category => category.id),
      mechanics: this.state.selectedMechanics.map(mechanic => mechanic.id),
      min_players: this.state.selectedMinPlayers,
      max_playtime: this.state.selectedMaxPlaytime
    }
    const searchString = this.generateSearchString(searchParameters)
    APIGameManager.getGamesFromSearch(searchString)
    .then(searchResults => {
      this.setState({searchResults: searchResults.games})
    })
  }

  generateSearchString = (searchParameters) => {
    let searchString = ""
    for (let param in searchParameters) {
      if (searchParameters[param] === 10 || searchParameters[param] === 120 ) {
        searchString += `&${param}=${searchParameters[param]}&gt_${param}=${searchParameters[param]}`
      } else if (searchParameters[param].length > 0 || searchParameters[param] > 0) {
        searchString += `&${param}=${searchParameters[param]}`
      }
    }
    return searchString
  }

  showModal = () => {
    return <Modal>
    <Modal.Header>Enter Search Parameters</Modal.Header>
    <Modal.Content image>
      <Modal.Description>
        <Header>Default Profile Image</Header>
        <p>
          We've found the following gravatar image associated with your e-mail
          address.
        </p>
        <p>Is it okay to use this photo?</p>
      </Modal.Description>
    </Modal.Content>
  </Modal>
  }

  render() {
    return (
      <>
      <SearchForm
      searchParameters={this.state}
      handleOnChange={this.handleOnChange}
      handleMultiSelectChange={this.handleMultiSelectChange}
      handleSingleSelectChange={this.handleSingleSelectChange}
      handleSearchButton={this.handleSearchButton}
      />
      </>
    )
  }
}

export default SearchGames