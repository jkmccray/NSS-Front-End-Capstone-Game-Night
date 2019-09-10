import React, { Component } from "react"
// import { List, Header } from "semantic-ui-react"
import SearchResultCard from "./SearchResultCard"
// import WelcomePage from "./components/welcome-and-login/WelcomePage"
// import NavBar from "./components/nav/NavBar"

import "./SearchResultList.css"

class SearchResultList extends Component {
  render() {
    return (
      <div id="searchResultContainer">
        <h2>search results:</h2>
        <ul id="searchResultList">
          <SearchResultCard />
        </ul>
      </div>
    )
  }
}

export default SearchResultList