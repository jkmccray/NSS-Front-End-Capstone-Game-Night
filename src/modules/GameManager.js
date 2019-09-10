const remoteURL = "http://localhost:5002"

export default {
  getSinglGameById(id) {
    return fetch(`${remoteURL}/games/${id}`)
      .then(result => result.json())
  },
  getGameByGameId(gameId) {
    return fetch(`${remoteURL}/games?gameId=${gameId}`)
      .then(result => result.json())
  },
  getAll() {
    return fetch(`${remoteURL}/games`)
      .then(result => result.json())
  },
  delete(id) {
    return fetch(`http://localhost:5002/games/${id}`, {
      method: "DELETE"
    })
      .then(result => result.json())
  },
  addGametoDb(gameObj) {
    return fetch(`${remoteURL}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gameObj)
    })
      .then(result => result.json())
  }
}