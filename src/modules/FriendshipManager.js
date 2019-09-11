const remoteURL = "http://localhost:5002"

export default {
    getSingleFriendship(id) {
        return fetch(`${remoteURL}/friendships/${id}`)
            .then(result => result.json())
    },
    getAllFriendships(friendObjProperty, searchId) {
        return fetch(`${remoteURL}/friendships?${friendObjProperty}=${searchId}`)
            .then(result => result.json())
    },
    addFriendshipRequest(friendshipObj) {
        return fetch(`${remoteURL}/friendships/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friendshipObj)
        })
            .then(result => result.json())
    },
    deleteFriendship(friendshipId) {
        return fetch(`${remoteURL}/friendships/${friendshipId}`, {
            method: "DELETE"
        })
            .then(result => result.json())
    },
    acceptFriendship(friendshipObj) {
        return fetch(`${remoteURL}/friendships/${friendshipObj.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friendshipObj)
        })
            .then(result => result.json())
    }
}