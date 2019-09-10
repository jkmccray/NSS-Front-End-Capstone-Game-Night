import React, { Component } from "react"
import { Message } from "semantic-ui-react"
import SearchResultCard from "./SearchResultCard"
import APIGameManager from "../../modules/APIGameManager"
import GameManager from "../../modules/GameManager"
import UserGameLists from "../../modules/UserGameListManager"
import GamesSavedToLists from "../../modules/GameSavedToListManager"

import "./SearchResultList.css"
import generate from "@babel/generator"

class SearchResultList extends Component {
  state = {
    selectedGameId: 0,
    selectedGameName: "",
    selectedGameList: 0,
    selectedGameListName: "",
    userGameLists: [],
    showModal: false,
    hideSuccessMessage: true,
    successMessage: ""
  }

  activeUser = sessionStorage.getItem("activeUser")

  componentDidMount() {
    this.getAllUserGameLists()
  }

  getAllUserGameLists = () => {
    UserGameLists.getAllUserLists(this.activeUser)
      .then(lists => {
        this.setState({ userGameLists: lists })
      })
  }

  // =============== Functions: Add Game Btn Handler, Check if Game in Db, Create Game Obj and Save to Db ===============
  handleAddGameToListBtnOnClick = (event) => {
    this.setState({hideSuccessMessage: true})
    const gameId = event.target.id.split("--")[1]
    APIGameManager.getGamesByIds(gameId)
      .then(resultObj => {
        const gameObjFromApi = resultObj.games[0]
        // check if game has already been saved to games resource in database.json
        this.checkIfGameInDbAndSetState(gameObjFromApi)
      })
  }

  checkIfGameInDbAndSetState = (gameObjFromApi) => {
    GameManager.getGameByGameId(gameObjFromApi.id)
      .then(gameObjFromDb => {
        console.log('gameObjFromDb: ', gameObjFromDb);
        // If the game does not exist in the database, add gameObjFromApi to the database
        // If it does exist, use id of the game in the db
        if (gameObjFromDb.length === 0) {
          this.createGameObjAndSaveToDb(gameObjFromApi)
            // Function above returns the game object
            // Set state for selectedGameId to be the integer id of the game saved to db
            .then(gameObjInDb => {
              this.setState({
                selectedGameId: gameObjInDb.id,
                selectedGameName: gameObjInDb.name,
                showModal: true
              })
            })
        } else {
          this.setState({
            selectedGameId: gameObjFromDb[0].id,
            selectedGameName: gameObjFromDb[0].name,
            showModal: true
          })
        }
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
    return GameManager.addGametoDb(gameObjToSave)
  }

  // ============================== Handler function for modals ==============================
  handleGameListSelectChange = (event) => {
    const userListId = parseInt(event.target.id)
    const userListName = event.target.textContent
    this.setState({
      selectedGameList: userListId,
      selectedGameListName: userListName
    })
  }

  handleSaveGameToListBtnOnClick = (event) => {
    const saveGameToListObj = {
      gameId: this.state.selectedGameId,
      userListId: this.state.selectedGameList
    }
    GamesSavedToLists.addGametoUserList(saveGameToListObj)
      .then(gameAndListObj => {
        console.log('gameAndListObj: ', gameAndListObj);

        this.setState({
          showModal: false,
          hideSuccessMessage: false,
          successMessage: `You added ${this.state.selectedGameName} to "${this.state.selectedGameListName}"!`
        })
      })
  }

  handleModalOnClose = () => {
    this.setState({
      showModal: false,
      selectedGameId: 0,
      selectedGameName: "",
      selectedGameList: 0,
      selectedGameListName: ""
    })
  }

  // ===================================== Render ============================================
  render() {
    return (
      <div id="searchResultContainer">
        <h2>search results:</h2>
        <Message
        hidden={this.state.hideSuccessMessage}
          success
          content={this.state.successMessage}
        />
        <ul id="searchResultList">
          {
            this.props.searchResults.map(searchResult => {
              return <SearchResultCard
                key={searchResult.id}
                searchResult={searchResult}
                handleAddGameToListBtnOnClick={this.handleAddGameToListBtnOnClick}
                handleGameListSelectChange={this.handleGameListSelectChange}
                handleSaveGameToListBtnOnClick={this.handleSaveGameToListBtnOnClick}
                userGameLists={this.state.userGameLists}
                showModal={this.state.showModal}
                handleModalOnClose={this.handleModalOnClose}
              />
            })
          }
        </ul>
      </div>
    )
  }
}

export default SearchResultList