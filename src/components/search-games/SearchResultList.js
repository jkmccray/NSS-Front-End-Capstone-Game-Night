import React, { Component } from "react"
import { Message, Header } from "semantic-ui-react"
import SearchResultCard from "./SearchResultCard"
import APIGameManager from "../../modules/APIGameManager"
import GameManager from "../../modules/GameManager"
import UserGameLists from "../../modules/UserGameListManager"
import GamesOwnedAndPlayed from "../../modules/GamesOwnedAndPlayedManager"
import GamesSavedToLists from "../../modules/GameSavedToListManager"

import "./SearchResultList.css"

class SearchResultList extends Component {
  state = {
    selectedGameId: 0,
    selectedGameName: "",
    selectedGameList: 0,
    selectedGameListName: "",
    userGameLists: [],
    showModal: false,
    hideSuccessMessage: true,
    successMessage: "",
    playedGameCheckbox: false,
    ownedGameCheckbox: false,
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
  handleAddGameToListBtnOnClick = (event, searchResult) => {
    console.log(searchResult.image_url)
    this.setState({ hideSuccessMessage: true })
    // check if game has already been saved to games resource in database.json
    this.checkIfGameInDbAndSetState(searchResult)
  }

  checkIfGameInDbAndSetState = (searchResult) => {
    GameManager.getGameByGameId(searchResult.id)
      .then(gameObjFromDb => {
        // If the game does not exist in the database, add gameObjFromApi to the database
        // If it does exist, use id of the game in the db
        if (gameObjFromDb.length === 0) {
          this.createGameObjAndSaveToDb(searchResult)
            // Function above returns the game object
            // Set state for selectedGameId to be the integer id of the game saved to db
            .then(gameObjAddedToDb => {
              this.setState({
                selectedGameId: gameObjAddedToDb.id,
                selectedGameName: gameObjAddedToDb.name,
                showModal: true
              })
            })
        } else {
          // this.checkGameIsPlayedOrOwnedAndSetState(gameObjFromDb[0])
          this.setState({
            selectedGameId: gameObjFromDb[0].id,
            selectedGameName: gameObjFromDb[0].name,
            showModal: true
          })
        }
      })
  }

  // checkGameIsPlayedOrOwnedAndSetState = (gameObj) => {
  //   GamesOwnedAndPlayed.getGamePlayedOrOwnedByActiveUser(gameObj)
  //     .then(results => {
  //       if (results.length > 0) {
  //         const gameAndUserObj = results[0]
  //         this.setState({
  //           ownedGameCheckbox: gameAndUserObj.owned,
  //           playedGameCheckbox: gameAndUserObj.played,
  //           selectedGameId: gameObj.id,
  //           selectedGameName: gameObj.name,
  //           showModal: true
  //         })
  //       } else {
  //         this.setState({
  //           selectedGameId: gameObj.id,
  //           selectedGameName: gameObj.name,
  //           showModal: true

  //         })
  //       }
  //     })
  // }

  createGameObjAndSaveToDb = (gameObjFromApi, searchResult) => {
    const gameObjToSave = {
      gameId: gameObjFromApi.id,
      name: gameObjFromApi.name,
      names: gameObjFromApi.names,
      description: gameObjFromApi.description,
      categories: gameObjFromApi.categories,
      mechanics: gameObjFromApi.mechanics,
      avg_rating: gameObjFromApi.average_user_rating,
      num_user_ratings: gameObjFromApi.num_user_ratings,
      image_url: searchResult.image_url,
      thumb_url: searchResult.thumb_url,
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

  // ============================== Handler functions for modals ==============================
  handleGameListSelectChange = (event) => {
    const nodeName = event.target.nodeName
    let userListId
    let userListName
    if (nodeName === "DIV") {
      userListId = parseInt(event.target.id)
      userListName = event.target.textContent
    } else if (nodeName === "SPAN") {
      userListId = parseInt(event.target.parentNode.id)
      userListName = event.target.parentNode.textContent
    }
    if (userListId && userListName) {
      this.setState({
        selectedGameList: userListId,
        selectedGameListName: userListName
      })
    } else {
      this.setState({
        selectedGameList: 0,
        selectedGameListName: ""
      })
    }
  }

  handleCheckboxOnChange = (event) => {
    this.setState({ [event.target.id]: event.target.checked })
  }


  handleSaveGameToListBtnOnClick = (event, id) => {
    // verify game list or checkbox was selected
    if (this.state.selectedGameList === 0 && !this.state.ownedGameCheckbox && !this.state.playedGameCheckbox) {
      alert("make a selection")
    }
    // if game list selected, save game to list in db, close modal, and show success message
    if (this.state.selectedGameList > 0) {
      const saveGameToListObj = {
        apiGameId: this.state.selectedGameId,
        userListId: this.state.selectedGameList
      }
      GamesSavedToLists.addGametoUserList(saveGameToListObj)
        .then(gameAndListObj => {
          this.setState({
            showModal: false,
            hideSuccessMessage: false,
            successMessage: `You added ${this.state.selectedGameName} to "${this.state.selectedGameListName}"!`
          })
        })
    }
    // if game checked as owned or played and already exists in join table for owned/played games, update the object in the join table
    if ((this.state.ownedGameCheckbox || this.state.playedGameCheckbox) && id > 0) {
      console.log("it worked")
      const saveGameAsOwnedOrPlayedObj = {
        owned: this.state.ownedGameCheckbox,
        played: this.state.playedGameCheckbox,
        id: id,
        userId: this.activeUser,
        apiGameId: this.state.selectedGameId
      }
      GamesOwnedAndPlayed.saveEditedOwnedorPlayed(saveGameAsOwnedOrPlayedObj)
      .then(() => this.setState({ showModal: false }))
    }
    // if game checked as owned or played and not in join table, add it to the join table and hide modal
    if ((this.state.ownedGameCheckbox || this.state.playedGameCheckbox) && id === 0) {
      const saveGameAsOwnedOrPlayedObj = {
        owned: this.state.ownedGameCheckbox,
        played: this.state.playedGameCheckbox,
        userId: this.activeUser,
        apiGameId: this.state.selectedGameId
      }
      GamesOwnedAndPlayed.getGamePlayedOrOwnedByActiveUser(saveGameAsOwnedOrPlayedObj)
      .then(() => this.setState({ showModal: false }))
    }
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
        <Header className="searchResultList__header">search results:</Header>
        <Message className="searchResultList__message"
          hidden={this.state.hideSuccessMessage}
          success
          content={this.state.successMessage}
        />
        {
          this.props.searchResults === "none"
            ? <Header className="searchResultList__header__small">No games found. Please try again.</Header>
            : <ul id="searchResultList">
              {
                this.props.searchResults.map(searchResult => {
                  if (searchResult.name && searchResult.description && searchResult.thumb_url) {
                    return <SearchResultCard
                      key={searchResult.id}
                      searchResult={searchResult}
                      handleAddGameToListBtnOnClick={this.handleAddGameToListBtnOnClick}
                      handleGameListSelectChange={this.handleGameListSelectChange}
                      handleSaveGameToListBtnOnClick={this.handleSaveGameToListBtnOnClick}
                      userGameLists={this.state.userGameLists}
                      showModal={this.state.showModal}
                      handleModalOnClose={this.handleModalOnClose}
                      handleCheckboxOnChange={this.handleCheckboxOnChange}
                    />
                  } else {
                    return null
                  }
                })
              }
            </ul>
        }
      </div>
    )
  }
}

export default SearchResultList