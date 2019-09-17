import React, { Component } from "react"
import { Modal, Header } from "semantic-ui-react"
import SearchForm from "./SearchForm"
import SearchResultList from "./SearchResultList"
import APIGameManager from "../../modules/APIGameManager"

import "./GameSearch.css"

class SearchGames extends Component {
  state={
    gameNameSearch: "",
    selectedCategories: [],
    selectedMechanics: [],
    selectedMinPlayers: 0,
    selectedMaxPlaytime: 0,
    searchResults:[],
    loadingStatus: false
  }

  handleOnChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleMultiSelectChange = (multiSelect, event) => {
    const nodeName = event.target.nodeName
    const arr = this.state[multiSelect]
    let name
    let id
    if (nodeName === "DIV") {
      name = event.target.textContent
      id = event.target.id
    } else if (nodeName === "SPAN") {
      name = event.target.parentNode.textContent
      id = event.target.parentNode.id
    }
    this.addOrRemoveSelectionFromState(name, id, event, multiSelect, arr)
  }

  addOrRemoveSelectionFromState = (name, id, event, multiSelect, arr) => {
    // if id exists, the category/mechanic is being added to the search
    if (id){
      const newObj = {
        name: name,
        id: id
      }
      arr.push(newObj)
      this.setState({[multiSelect]: arr})
      // if id does not exist, the category/mechanic is being removed from the search
    } else {
      const name = event.target.parentNode.textContent
      // use the text content of the parent node to identify which tag is being removed and remove the corresponding element in the array in state
      const i = arr.map(element => element.name).indexOf(name)
      arr.splice(i, 1)
      this.setState({[multiSelect]: arr})
    }
  }

  handleSingleSelectChange = (selection, event) => {
    const nodeName = event.target.nodeName
    let num
    if (nodeName === "DIV") {
      num = parseInt(event.target.textContent)
    } else if (nodeName === "SPAN") {
      num = parseInt(event.target.parentNode.textContent)
    }
    if (num) {
      this.setState({[selection]: num})
    } else {
      this.setState({[selection]: 0})
    }
  }

  handleSearchButton = (event) => {
    const searchParameters = {
      name: this.state.gameNameSearch,
      categories: this.state.selectedCategories.map(category => category.id),
      mechanics: this.state.selectedMechanics.map(mechanic => mechanic.id),
      min_players: this.state.selectedMinPlayers,
      max_playtime: this.state.selectedMaxPlaytime
    }
    if (searchParameters.name === "" && searchParameters.categories.length === 0 && searchParameters.mechanics.length === 0 && searchParameters.min_players === 0 && searchParameters.max_playtime === 0){
      alert("fill out at least one search field")
    } else {
      const searchString = this.generateGameSearchString(searchParameters)
      APIGameManager.getGamesFromSearch(searchString)
      .then(searchResults => {
        if (searchResults.games.length > 0) {
          this.checkImageUrls(searchResults.games)
        } else {
          this.setState({searchResults: "none"})
        }
      })
    }
  }

  checkImageUrls = (searchResults) => {
    const updatedSearchResults = []
    searchResults.forEach( searchResult => {
      const img = document.createElement("IMG")
      img.src = searchResult.thumb_url
      img.onerror = () => {
        console.log("onerror function worked", searchResult)
        searchResult.thumb_url = "https://react.semantic-ui.com/images/wireframe/image.png"
        searchResult.image_url = "https://react.semantic-ui.com/images/wireframe/image.png"
      }
      updatedSearchResults.push(searchResult)
    })
    this.setState({searchResults: updatedSearchResults})
  }

  generateGameSearchString = (searchParameters) => {
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

  render() {
    return (
      <div id="search-container">
      <SearchForm
      searchParameters={this.state}
      handleOnChange={this.handleOnChange}
      handleMultiSelectChange={this.handleMultiSelectChange}
      handleSingleSelectChange={this.handleSingleSelectChange}
      handleSearchButton={this.handleSearchButton}
      />
      {
        this.state.searchResults.length === 0
        ? null
        : <SearchResultList
      searchResults={this.state.searchResults}
      />
      }
      </div>
    )
  }
}

export default SearchGames