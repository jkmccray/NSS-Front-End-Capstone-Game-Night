import React, { Component } from "react"
import SearchForm from "./SearchForm"
import { Search } from "semantic-ui-react"
// import ApplicationViews from "./components/ApplicationViews"
// import WelcomePage from "./components/welcome-and-login/WelcomePage"
// import NavBar from "./components/nav/NavBar"

// import "./Kennel.css"

class SearchGames extends Component {
  state={
    gameNameSearch: "",
    selectedCategories: [],
    selectedMechanics: [],
    selectedMinPlayers: 0,
    selectedPlaytime: ""
  }

  handleOnChange = (event) => {
    console.log(event.target)
    this.setState({ [event.target.id]: event.target.value })
  }

  render() {
    return (
      <>
      <SearchForm
      searchParameters={this.state}
      handleOnChange={this.handleOnChange}
      />
      </>
    )
  }
}

export default SearchGames