const remoteURL = "http://localhost:5002"

export default {
  getSingleGameNight(id) {
    return fetch(`${remoteURL}/gameNights/${id}}`)
      .then(result => result.json())
  },
  getAllGameNights() {
    return fetch(`${remoteURL}/gameNights?_expand=user&_expand=userList`)
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