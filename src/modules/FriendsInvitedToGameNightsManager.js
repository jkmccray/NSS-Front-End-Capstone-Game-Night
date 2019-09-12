const remoteURL = "http://localhost:5002"

export default {
  getSingleUserInvitedAndGameNight(id) {
    return fetch(`${remoteURL}/usersInvitedToGameNights/${id}}`)
      .then(result => result.json())
  },
  getAllUsersInvitedToAGameNight(gameNightId) {
    return fetch(`${remoteURL}/usersInvitedToGameNights/${gameNightId}?_expand=user`)
      .then(result => result.json())
  },
  removeUserFromGameNight(id) {
    return fetch(`${remoteURL}/usersInvitedToGameNights/${id}`, {
      method: "DELETE"
    })
      .then(result => result.json())
  },
  inviteFriendToGameNight(userAndGameNightObj) {
    return fetch(`${remoteURL}/usersInvitedToGameNights`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userAndGameNightObj)
    })
      .then(result => result.json())
  }
}