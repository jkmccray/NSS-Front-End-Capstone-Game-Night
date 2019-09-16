import React, { Component } from "react"
import NavBar from "./components/nav/NavBar"
import ApplicationViews from "./components/ApplicationViews"

import "./components/general.css"

class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <ApplicationViews />
      </>
    )
  }
}

export default App