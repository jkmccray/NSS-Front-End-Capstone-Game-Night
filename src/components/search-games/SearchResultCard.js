import React, { Component } from "react"
import { List, Image, Button } from "semantic-ui-react"

import "./SearchResultCard.css"

class SearchResultCard extends Component {
  render() {
    return (
      <li className="searchResultCard">
        <Image src=""/>
        <h4>Test</h4>
        <Button className="addGameToList-btn">+</Button>
      </li>
    )
  }
}

export default SearchResultCard