import React, { Component } from 'react';
import { Image, Header, Rating, Divider } from "semantic-ui-react";
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
            <Header className="gameDetails__name">{this.props.searchResult.name}</Header>
            <Rating defaultRating={Math.round(this.props.searchResult.average_user_rating)} maxRating={5} disabled />
            <span>{`(${this.props.searchResult.num_user_ratings} ratings)`}</span>
            <Header>description</Header>
            <p className="gameDescription__p">{this.props.searchResult.description.replace(/(<([^>]+)>)/ig, " ")}</p>
          </div>
        </div>
        <Divider />
        <div className="moreGameInfo__div">
          {
            this.props.searchResult.min_players || this.props.searchResult.min_playtime || this.props.searchResult.min_age || this.props.searchResult.year_published
              ? <div className="gameDetailsList__div">
                <Header>details</Header>

                <ul className="gameStats gameDetails__list">
                  <li>{
                    this.props.searchResult.min_players === this.props.searchResult.max_players && this.props.searchResult.min_players
                      ? `Players: ${this.props.searchResult.min_players}`
                      : this.props.searchResult.min_players && this.props.searchResult.max_players
                        ? `Players: ${this.props.searchResult.min_players} - ${this.props.searchResult.max_players}`
                        : null
                  }</li>
                  <li>{
                    this.props.searchResult.min_playtime === this.props.searchResult.max_playtime && this.props.searchResult.min_playtime
                      ? `Playtime: ${this.props.searchResult.min_playtime} minutes`
                      : this.props.searchResult.min_playtime && this.props.searchResult.max_playtime
                        ? `Playtime: ${this.props.searchResult.min_playtime} - ${this.props.searchResult.max_playtime} minutes`
                        : null
                  }</li>
                  <li>{this.props.searchResult.min_age ? `Minimum Age: ${this.props.searchResult.min_age}` : null}</li>
                  <li>{this.props.searchResult.year_published ? `Year Published: ${this.props.searchResult.year_published}` : null}</li>
                </ul>
              </div>
              : null
          }
          {
            this.state.categories.length > 0
              ? <div className="gameDetailsList__div">
                <Header>categories</Header>
                <ul className="gameCategories gameDetails__list">
                  {this.state.categories.map(category => {
                    return <li key={category.id}>{category.name}</li>
                  })}
                </ul>
              </div>
              : null
          }
          {
            this.state.mechanics.length > 0
              ? <div className="gameDetailsList__div">
                <Header>mechanics</Header>
                <ul className="gameMechanics gameDetails__list">
                  {this.state.mechanics.map(mechanic => {
                    return <li key={mechanic.id}>{mechanic.name}</li>
                  })}
                </ul>
              </div>
              : null
          }
        </div>
      </div>
    )
  }

}

export default GameDetails