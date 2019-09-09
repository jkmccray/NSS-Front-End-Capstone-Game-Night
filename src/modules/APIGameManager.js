import APIKeys from "../APIKeys"

const remoteURL = "http://www.boardgameatlas.com/api"
const clientID = APIKeys.clientID

export default {
  getGamesArrByIds(idsArr) {
    return fetch(`${remoteURL}/search?client_id=${clientID}&ids=${idsArr}`)
    .then(result => result.json())
  },
  getAll() {
    return fetch(`${remoteURL}/search?client_id=${clientID}`)
    .then(result => result.json())
  }

}