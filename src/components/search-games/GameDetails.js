import React, { Component } from 'react';
import { Image, Header, Rating, Button, Icon } from "semantic-ui-react";
import APIGameManager from "../../modules/APIGameManager"

import './GameDetails.css'

class GameDetails extends Component {
  state = {
    categories: [],
    mechanics: [],
  }

  componentDidMount() {
    this.getGameCategories()
    this.getGameMechanics()
  }

  // get all categories from the board game api and set state
  getGameCategories = () => {
    APIGameManager.getAllCategories()
      .then(categories => {
        const categoriesArr = categories.categories
        const gameCategories = categoriesArr.filter(category => {
          return this.props.searchResult.categories.find(cat => cat.id === category.id)
        })
        this.setState({ categories: gameCategories })
      })
  }

  // get all game mechanics from the board game api and set state
  getGameMechanics = () => {
    APIGameManager.getAllGameMechanics()
      .then(mechanics => {
        const mechanicsArr = mechanics.mechanics
        const gameMechanics = mechanicsArr.filter(mechanic => {
          return this.props.searchResult.mechanics.find(mech => mech.id === mechanic.id)
        })
        this.setState({ mechanics: gameMechanics })
      })
  }


  render() {
    return (
      <div className="gameDetails__div">
        <div className="gameDetails__imgAndDesc">
          <Image className="gameDetails__img" src={this.props.searchResult.image_url} />
          <div className="gameNameAndDesc__div">
            <Header>{this.props.searchResult.name}</Header>
            <Rating defaultRating={Math.round(this.props.searchResult.average_user_rating)} maxRating={5} disabled />
            <span>{`(${this.props.searchResult.num_user_ratings} ratings)`}</span>
            <Header>description</Header>
            <p className="gameDescription__p">{this.props.searchResult.description.replace(/(<([^>]+)>)/ig, " ")}</p>
          </div>
        </div>
        <div className="moreGameInfo__div">
          <ul className="gameStats gameDetails__list"><Header>details</Header>
            <li>{`Players: ${this.props.searchResult.min_players} - ${this.props.searchResult.max_players}`}</li>
            <li>{`Playtime: ${this.props.searchResult.min_playtime} - ${this.props.searchResult.max_playtime} minutes`}</li>
            <li>{`Minimum Age: ${this.props.searchResult.min_age}`}</li>
            <li>{`Year Published: ${this.props.searchResult.year_published}`}</li>
          </ul>
          {
            this.state.categories.length > 0
              ? <ul className="gameCategories gameDetails__list"><Header>categories</Header>
                {this.state.categories.map(category => {
                  return <li key={category.id}>{category.name}</li>
                })}
              </ul>
              : null
          }
          {
            this.state.mechanics.length > 0
              ? <ul className="gameMechanics gameDetails__list"><Header>mechanics</Header>
                {this.state.mechanics.map(mechanic => {
                  return <li key={mechanic.id}>{mechanic.name}</li>
                })}
              </ul>
              : null
          }

        </div>
      </div>
    )
  }

}

export default GameDetails