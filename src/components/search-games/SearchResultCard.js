import React, { Component } from "react"
import { List, Image, Button } from "semantic-ui-react"

import "./SearchResultCard.css"

class SearchResultCard extends Component {
  render() {
    return (
      <li className="searchResultCard">
        <Image src={this.props.searchResult.thumb_url} className="searchResult__image"/>
        <h4>{this.props.searchResult.name}</h4>
        <Button
        onClick={this.props.handleAddGameToListBtnOnClick}
        className="addGameToList__btn"
        id={`addGameToListBtn--${this.props.searchResult.id}`}
        >+</Button>
      </li>
    )
  }
}

export default SearchResultCard