const remoteURL = "http://localhost:5002"

export default {
  getSinglGameById(id) {
    return fetch(`${remoteURL}/apiGames/${id}`)
      .then(result => result.json())
  },
  getGameByGameId(gameId) {
    return fetch(`${remoteURL}/apiGames?gameId=${gameId}`)
      .then(result => result.json())
  },
  getAllGames() {
    return fetch(`${remoteURL}/apiGames`)
      .then(result => result.json())
  },
  deleteGame(id) {
    return fetch(`${remoteURL}/apiGames/${id}`, {
      method: "DELETE"
    })
      .then(result => result.json())
  },
  addGametoDb(gameObj) {
    return fetch(`${remoteURL}/apiGames`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gameObj)
    })
      .then(result => result.json())
  }
}