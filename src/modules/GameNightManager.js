const remoteURL = "http://localhost:5002"

export default {
  getSingleGameNight(id) {
    return fetch(`${remoteURL}/gameNights/${id}?_expand=user`)
      .then(result => result.json())
  },
  getAllGameNights() {
    return fetch(`${remoteURL}/gameNights?_expand=user&_expand=userList&_sort=date_and_time&_order=asc`)
      .then(result => result.json())
  },
  getAllUserGameNights(userId) {
    return fetch(`${remoteURL}/gameNights?userId=${userId}&_expand=user&_expand=userList&_sort=date_and_time&_order=asc`)
      .then(result => result.json())
  },
  getAllGameNightsWithSameList(userListId) {
    return fetch(`${remoteURL}/gameNights?userListId=${userListId}`)
      .then(result => result.json())
  },
  deleteGameNight(id) {
    return fetch(`${remoteURL}/gameNights/${id}`, {
      method: "DELETE"
    })
      .then(result => result.json())
  },
  addGameNight(gameNightObj) {
    return fetch(`${remoteURL}/gameNights`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gameNightObj)
    })
      .then(result => result.json())
  },
  saveEditedGameNight(gameNightObj) {
    return fetch(`${remoteURL}/gameNights/${gameNightObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(gameNightObj)
    })
      .then(result => result.json())
  }
}