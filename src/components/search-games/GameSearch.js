import React, { Component } from "react"
import SearchForm from "./SearchForm"

// import "./GameSearch.css"

class SearchGames extends Component {
  state={
    gameNameSearch: "",
    selectedCategories: [],
    selectedMechanics: [],
    selectedMinPlayers: 0,
    selectedPlaytime: ""
  }

  handleOnChange = (event) => {
    this.setState({ [event.target.id]: event.target.value })
  }

  handleMultiSelectChange = (selection, event) => {
    const arr = this.state[selection]
    console.log('arr-before: ', arr);
    if (event.target.id){
      const newObj = {
        name: event.target.textContent,
        value: event.target.id
      }
      arr.push(newObj)
      this.setState({[selection]: arr})
    } else {
      const name = event.target.parentNode.textContent
      console.log('name: ', name);
      const i = arr.map(element => element.name).indexOf(name)
      console.log('i: ', i);
      arr.splice(i, 1)
      this.setState({[selection]: arr})
    }
    console.log('arr-after: ', arr);
  }

  render() {
    return (
      <>
      <SearchForm
      searchParameters={this.state}
      handleOnChange={this.handleOnChange}
      handleMultiSelectChange={this.handleMultiSelectChange}
      />
      </>
    )
  }
}

export default SearchGames