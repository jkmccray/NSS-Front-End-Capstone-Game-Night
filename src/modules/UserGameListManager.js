const remoteURL = "http://localhost:5002"
const activeUser = sessionStorage.getItem("activeUser")

export default {
  getSingleUserList(id) {
    return fetch(`${remoteURL}/userLists/${id}`)
      .then(result => result.json())
  },
  getAllUserLists() {
    return fetch(`${remoteURL}/userLists?userId=${activeUser}`)
      .then(result => result.json())
  },
  deleteGameFromUserList(id) {
    return fetch(`http://localhost:5002/userLists/${id}`, {
      method: "DELETE"
    })
      .then(result => result.json())
  },
  addGametoUserList(UserListObj) {
    return fetch(`${remoteURL}/userLists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(UserListObj)
    })
      .then(result => result.json())
  }
}