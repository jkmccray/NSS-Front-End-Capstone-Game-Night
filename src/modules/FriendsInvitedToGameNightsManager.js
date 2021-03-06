const remoteURL = "http://localhost:5002"

export default {
  getSingleUserInvitedAndGameNight(userId, gameNightId) {
    return fetch(`${remoteURL}/usersInvitedToGameNights?userId=${userId}&gameNightId=${gameNightId}`)
      .then(result => result.json())
  },
  getAllUsersInvitedToAGameNight(gameNightId) {
    return fetch(`${remoteURL}/usersInvitedToGameNights/${gameNightId}?_expand=user`)
      .then(result => result.json())
  },
  getAllUsersAttendingAGameNight(gameNightId) {
    return fetch(`${remoteURL}/usersInvitedToGameNights?gameNightId=${gameNightId}&inviteStatus=attending&_expand=user`)
      .then(result => result.json())
  },
  getAllGameNightsForSingleUser(userId) {
    return fetch(`${remoteURL}/usersInvitedToGameNights?inviteStatus=attending&userId=${userId}&_expand=gameNight`)
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
  },
  updateInviteStatus(userAndGameNightObj) {
    return fetch(`${remoteURL}/usersInvitedToGameNights/${userAndGameNightObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userAndGameNightObj)
    })
      .then(result => result.json())
  }
}