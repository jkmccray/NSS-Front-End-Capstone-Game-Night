const remoteURL = "http://localhost:5002"
const activeUser = parseInt(sessionStorage.getItem("activeUser"))

export default {
  getSingleOwnedOrPlayed(id) {
    return fetch(`${remoteURL}/ownedAndPlayedGames/${id}`)
      .then(result => result.json())
  },
  getAllPlayedGames() {
    return fetch(`${remoteURL}/ownedAndPlayedGames?userId=${activeUser}&played=true&_expand=apiGame`)
      .then(result => result.json())
  },
  getAllOwnedGames() {
    return fetch(`${remoteURL}/ownedAndPlayedGames?userId=${activeUser}&owned=true&_expand=apiGame`)
      .then(result => result.json())
  },
  deleteOwnedorPlayed(id) {
    return fetch(`${remoteURL}/ownedAndPlayedGames/${id}`, {
      method: "DELETE"
    })
      .then(result => result.json())
  },
  addGameOwnedorPlayed(UserOwnedorPlayedObj) {
    return fetch(`${remoteURL}/ownedAndPlayedGames`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(UserOwnedorPlayedObj)
    })
      .then(result => result.json())
  },
  saveEditedOwnedorPlayed(ownedorPlayedObj) {
    return fetch(`${remoteURL}/ownedAndPlayedGames/${ownedorPlayedObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ownedorPlayedObj)
    })
      .then(result => result.json())
  }
}