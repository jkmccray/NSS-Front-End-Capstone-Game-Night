import React, { Component } from "react"
import SearchForm from "./SearchForm"

// import "./GameSearch.css"

class SearchGames extends Component {
  state={
    gameNameSearch: "",
    selectedCategories: [],
    selectedMechanics: [],
    selectedMinPlayers: 0,
    selectedMaxPlaytime: ""
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
        value: event.target.id
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
    const num = parseFloat(event.target.textContent)
    this.setState({[selection]: num})
  }

  render() {
    return (
      <>
      <SearchForm
      searchParameters={this.state}
      handleOnChange={this.handleOnChange}
      handleMultiSelectChange={this.handleMultiSelectChange}
      handleSingleSelectChange={this.handleSingleSelectChange}
      />
      </>
    )
  }
}

export default SearchGames