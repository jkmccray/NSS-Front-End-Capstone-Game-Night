const remoteURL = "http://localhost:5002"

export default {
  getSingleGameSavedToUserList(gameId, userListId) {
    return fetch(`${remoteURL}/gamesSavedByUsersToLists?gameId=${gameId}&userListId=${userListId}`)
      .then(result => result.json())
  },
  getAllGamesSavedToSingleList(userListId) {
    return fetch(`${remoteURL}/gamesSavedByUsersToLists?userListId=${userListId}&_expand=game`)
      .then(result => result.json())
  },
  getAllGamesSavedToUserLists() {
    return fetch(`${remoteURL}/gamesSavedByUsersToLists`)
      .then(result => result.json())
  },
  deleteGameFromUserList(id) {
    return fetch(`http://localhost:5002/gamesSavedByUsersToLists/${id}`, {
      method: "DELETE"
    })
      .then(result => result.json())
  },
  addGametoUserList(gameAndUserObj) {
    return fetch(`${remoteURL}/gamesSavedByUsersToLists?_expand=userList&_expand=game`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gameAndUserObj)
    })
      .then(result => result.json())
  }
}