import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import './GameNight.css'

class GameNightCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-content">
          <ul>
            <li>
              Board Game: Catan
            </li>
            <li>
              Board Game: Dominion
            </li>
            <li>
              Board Game: Pandemic
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default GameNightCard