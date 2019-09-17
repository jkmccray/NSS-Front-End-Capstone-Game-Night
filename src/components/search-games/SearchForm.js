import React, { Component } from "react"
import { Input, Dropdown, Button } from "semantic-ui-react"
import APIGameManager from "../../modules/APIGameManager"
// import WelcomePage from "./components/welcome-and-login/WelcomePage"
// import NavBar from "./components/nav/NavBar"

import "./SearchForm.css"

class SearchForm extends Component {
  state = {
    categoryOptions: [],
    mechanicsOptions: [],
    minPlayers: [],
    playtimes: [],
  }

  componentDidMount() {
    this.getCategoryOptions()
    this.getMechanicsOptions()
    this.getMinPlayers()
    this.getPlaytimes()
  }

  // get all categories from the board game api and set state
  getCategoryOptions = () => {
    APIGameManager.getAllCategories()
      .then(categoriesArr => {
        const categories = categoriesArr.categories
        this.setState({ categoryOptions: categories })
      })
  }

  // get all game mechanics from the board game api and set state
  getMechanicsOptions = () => {
    APIGameManager.getAllGameMechanics()
      .then(mechanicsArr => {
        const mechanics = mechanicsArr.mechanics
        this.setState({ mechanicsOptions: mechanics })
      })
  }

  // create array of objects for min player select options
  getMinPlayers = () => {
    // create array of consecutive numbers from 0-9
    const values = [...Array(10).keys()]
    const minPlayers = values.map(value => {
      return {
        value: value + 1,
        text: value + 1
      }
    })
    // set text of last option to be catch-all
    minPlayers[9].text = "10+"
    this.setState({ minPlayers: minPlayers })
  }

  // create array of objects for max playtime select options
  getPlaytimes = () => {
    const values = [15, 30, 45, 60, 90, 120]
    const playtimes = values.map(value => {
      return {
        value: value,
        text: `${value} mintues`
      }
    })
    playtimes[5].text = "120 minutes +"
    this.setState({ playtimes: playtimes })
  }

  render() {
    return (
      <div className="search-form">
        <Input
        fluid
          onChange={this.props.handleOnChange}
          className="search-field"
          id="gameNameSearch"
          icon='search'
          placeholder='Search by name...' />
        <Dropdown
          onChange={(e) => this.props.handleMultiSelectChange("selectedCategories", e)}
          placeholder='Select categories'
          className="search-field"
          id="selectedCategories"
          fluid
          multiple
          search
          selection
          options={
            this.state.categoryOptions.map(category => ({
              key: category.id,
              text: category.name,
              value: category.id,
              id: category.id,
            }))
          }
        />
        <Dropdown
          onChange={(e) => this.props.handleMultiSelectChange("selectedMechanics", e)}
          placeholder='Select game mechanics'
          className="search-field"
          id="selectedMechanics"
          fluid
          multiple
          search
          selection
          options={
            this.state.mechanicsOptions.map(mechanic => ({
              key: mechanic.id,
              text: mechanic.name,
              value: mechanic.id,
              id: mechanic.id
            }))
          }
        />
        <Dropdown
          onChange={(e) => this.props.handleSingleSelectChange("selectedMinPlayers", e)}
          placeholder='Select minimum players'
          className="search-field"
          id="selectedMinPlayers"
          clearable
          fluid
          search
          selection
          options={
            this.state.minPlayers.map(playerNum => ({
              key: playerNum.value,
              text: playerNum.text,
              value: playerNum.value,
            }))
          }
        />
        <Dropdown
          onChange={(e) => this.props.handleSingleSelectChange("selectedMaxPlaytime", e)}
          placeholder='Select maximum playtime'
          className="search-field"
          id="selectedMaxPlaytime"
          clearable
          fluid
          search
          selection
          options={
            this.state.playtimes.map(playtime => ({
              key: playtime.value,
              text: playtime.text,
              value: playtime.value,
            }))
          }
        />
        <div className="searchBtn__div">
          <Button onClick={this.props.handleSearchButton}
              className="search-btn"
            >search</Button> </div>
      </div>
    )
  }
}

export default SearchForm