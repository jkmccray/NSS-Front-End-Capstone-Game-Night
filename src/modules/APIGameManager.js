import APIKeys from "../APIKeys"

const remoteURL = "http://www.boardgameatlas.com/api"
const clientID = APIKeys.clientID

export default {
  getGamesByIds(idsArr) {
    return fetch(`${remoteURL}/search?client_id=${clientID}&ids=${idsArr}`)
    .then(result => result.json())
  },
  getPopularGames() {
    return fetch(`${remoteURL}/search?client_id=${clientID}&order_by=popularity&limit=10`)
    .then(result => result.json())
  },
  getGamesPublishedThisYear() {
    return fetch(`${remoteURL}/search?client_id=${clientID}&year_published=2019&limit=10&order_by=popularity`)
    .then(result => result.json())
  },
  getRandomGame() {
    return fetch(`${remoteURL}/search?client_id=${clientID}&random=true`)
    .then(result => result.json())
  },
  getAllGames() {
    return fetch(`${remoteURL}/search?client_id=${clientID}`)
    .then(result => result.json())
  },
  getAllCategories() {
    return fetch(`${remoteURL}/game/categories?client_id=${clientID}`)
    .then(result => result.json())
  },
  getAllGameMechanics() {
    return fetch(`${remoteURL}/game/mechanics?client_id=${clientID}`)
    .then(result => result.json())
  },
  getGamesFromSearch(searchString) {
    return fetch(`${remoteURL}/search?client_id=${clientID}&${searchString}`)
    .then(result => result.json())
  }
}