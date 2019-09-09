import React, { Component } from "react"
import NavBar from "./components/nav/NavBar"
import ApplicationViews from "./components/ApplicationViews"

// import "./Kennel.css"

class Games extends Component {
  render() {
    return (
      <>
        <NavBar />
        <ApplicationViews />
      </>
    )
  }
}

export default Games