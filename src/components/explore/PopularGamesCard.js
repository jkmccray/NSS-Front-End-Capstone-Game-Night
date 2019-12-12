import React, { Component } from "react"
import { Header, Image, Modal, Rating } from "semantic-ui-react"
import GameDetails from "../search-games/GameDetails"

import "./PopularGamesCard.css"

class PopularGamesCard extends Component {

  displayPopularGameName = () => {
    return <Modal
      closeIcon
      trigger={<h4 className="searchResultCard__name">{this.props.popularGame.name}</h4>}
    >
      <Modal.Content>
        <GameDetails
          searchResult={this.props.popularGame}
        />
      </Modal.Content>
    </Modal>
  }


  render() {
    return <div className="popularGameCard__div">
      <div className="popularGameCardImg__div">
      <Image className="popularGameCard__img" src={this.props.popularGame.image_url}/>
      </div>
      <Header className="popularGameCard__name">{this.displayPopularGameName()}</Header>
      <span><Rating defaultRating={Math.round(this.props.popularGame.average_user_rating)} maxRating={5} disabled /> {`(${this.props.popularGame.num_user_ratings} ratings)`}</span>
    </div>
  }

}
export default PopularGamesCard
