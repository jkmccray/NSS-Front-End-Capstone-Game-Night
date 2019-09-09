const remoteURL = "http://localhost:5002"

export default {
  get(id) {
    return fetch(`${remoteURL}/games/${id}`)
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

}