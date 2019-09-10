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
    loadingStatus: false
  }

  componentDidMount() {
    this.getCategoryOptions()
    this.getMechanicsOptions()
    this.getMinPlayers()
    this.getPlaytimes()
  }

  getCategoryOptions = () => {
    APIGameManager.getAllCategories()
      .then(categoriesArr => {
        const categories = categoriesArr.categories
        this.setState({ categoryOptions: categories })
      })
  }

  getMechanicsOptions = () => {
    APIGameManager.getAllGameMechanics()
      .then(mechanicsArr => {
        const mechanics = mechanicsArr.mechanics
        this.setState({ mechanicsOptions: mechanics })
      })
  }

  getMinPlayers = () => {
    const values = [...Array(10).keys()]
    const minPlayers = values.map(value => {
      return {
        value: value + 1,
        text: value + 1
      }
    })
    minPlayers[9].text = "10+"
    this.setState({ minPlayers: minPlayers })
  }

  getPlaytimes = () => {
    const values = [15, 30, 45, 60, 90, 120, 121]
    const playtimes = values.map(value => {
      return {
        value: value,
        text: `${value} mintues`
      }
    })
    playtimes[6].text = "Over 120 minutes"
    this.setState({ playtimes: playtimes })
  }

  render() {
    return (
      <div className="search-form">
        <Input
        onChange={this.props.handleOnChange}
        className="search-field"
        id="gameNameSearch"
        icon='search'
        placeholder='Search by name...' />
        <Dropdown
          onChange={this.props.handleOnChange}
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
            }))
          }
        />
        <Dropdown
          placeholder='Select game mechanics'
          className="search-field"
          fluid
          multiple
          search
          selection
          options={
            this.state.mechanicsOptions.map(mechanic => ({
              key: mechanic.id,
              text: mechanic.name,
              value: mechanic.id,
            }))
          }
        />
        <Dropdown
          placeholder='Select minimum players'
          className="search-field"
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
          placeholder='Select maximum playtime'
          className="search-field"
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
        {
          !this.state.loadingStatus
          ? <Button primary className="search-btn">search</Button>
          : <Button loading primary className="search-btn">Loading</Button>
        }

      </div>
    )
  }
}

export default SearchForm