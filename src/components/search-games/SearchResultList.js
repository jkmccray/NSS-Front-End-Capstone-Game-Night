import React, { Component } from "react"
// import { List, Header } from "semantic-ui-react"
import SearchResultCard from "./SearchResultCard"
import APIGameManager from "../../modules/APIGameManager"
import GameManager from "../../modules/GameManager"
import GamesSavedToLists from "../../modules/GameSavedToListManager"

import "./SearchResultList.css"

class SearchResultList extends Component {
  state={
    gameAddedToList: {}
  }

  handleAddGameToListBtnOnClick = (event) => {
    const gameId = event.target.id.split("--")[1]
    APIGameManager.getGamesByIds(gameId)
    .then(result => {
      const entireGameObj = result.games[0]
      GameManager.getSinglGameByGameId(entireGameObj.id)
      .then(data => console.log(data))
    })
  }

  createGameObjAndSaveToDb = (gameObjFromApi) => {
    const gameObjToSave = {
      gameId: gameObjFromApi.id,
      name: gameObjFromApi.name,
      names: gameObjFromApi.names,
      description: gameObjFromApi.description,
      categories: gameObjFromApi.categories,
      mechanics: gameObjFromApi.mechanics,
      avg_rating: gameObjFromApi.average_user_rating,
      num_user_ratings: gameObjFromApi.num_user_ratings,
      image_url: gameObjFromApi.image_url,
      thumb_url: gameObjFromApi.thumb_url,
      min_players: gameObjFromApi.min_players,
      max_players: gameObjFromApi.max_players,
      min_playtime: gameObjFromApi.min_playtime,
      max_playtime: gameObjFromApi.max_playtime,
      min_age: gameObjFromApi.min_age,
      year_published: gameObjFromApi.year_published,
      rules_url: gameObjFromApi.rules_url
    }
    GameManager.addGametoDb(gameObjToSave)
  }

  render() {
    return (
      <div id="searchResultContainer">
        <h2>search results:</h2>
        <ul id="searchResultList">
          {
            this.props.searchResults.map(searchResult => {
              return <SearchResultCard
              key={searchResult.id}
              searchResult={searchResult}
              handleAddGameToListBtnOnClick={this.handleAddGameToListBtnOnClick}
              />
            })
          }
        </ul>
      </div>
    )
  }
}

export default SearchResultList