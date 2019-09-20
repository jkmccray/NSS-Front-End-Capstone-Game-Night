import React, { Component } from "react"
import { Image, Header, Icon, Modal, Button } from "semantic-ui-react"
import ProfilePlaceholder from "../../images/profile_placeholder.png"
import UserManager from "../../modules/UserManager"
import * as firebase from "firebase/app";
import 'firebase/storage';

import "./UserInfoCard.css"
import "../game-nights/GameNightCard.css"

class UserInfoCard extends Component {
  state = {
    photo: null,
    uploading: false,
    username: "",
    profilePicture: ""
  }

  componentDidMount() {
    this.getActiveUser()
    this.props.getNextGameNight()
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))

  getActiveUser = () => {
    return UserManager.getSingleUser(this.activeUser)
      .then(user => this.setState({
        username: user.username,
        profilePicture: user.photoUrl
      }))
  }

  onChange = (event) => {
    this.setState({
      uploading: true,
      photo: event.target.files[0]
    })
  }

  handleSaveProfilePicBtnOnClick = () => {
    // Step 1: save image to firebase
    const imagesRef = firebase.storage().ref('images')
    const childRef = imagesRef.child(`${this.activeUser}-${Date.now()}`) // has to have a unique name

    // Step 2: get URL from firebase
    // put method returns a promise
    childRef.put(this.state.photo)
      .then(response => response.ref.getDownloadURL())
      .then(url => {
        return UserManager.addUserProfilePicture({
          id: this.activeUser,
          photoUrl: url
        })
          .then(() => {
            this.getActiveUser()
            this.setState({
              uploading: false,
              showModal: false
            })
          })
      })
    // Step 3: save everything to json-server
  }

  render() {
    return (
      <div className="userInfoCard__div">
        <Image className="uploadedProfile__img" src={
          this.state.profilePicture
            ? this.state.profilePicture
            : ProfilePlaceholder
        } />
        <Header className="profile__name">{this.state.username}</Header>
        <Modal className="profileImg__modal" size="mini" open={this.state.showModal} trigger={
          <label onClick={() => this.setState({ showModal: true })}
            htmlFor="embedfileinput"
            className="ui button inputFile__label">
            {
              this.state.profilePicture
              ? "change profile picture"
              : "add profile picture"
            }
            </label>
        }>
          <Modal.Content>
            <input type="file" className="inputfile" id="embedfileinput" hidden onChange={this.onChange} />
            {
              this.state.uploading
              && <><p>Selected file: {this.state.photo.name}</p><Button onClick={this.handleSaveProfilePicBtnOnClick}>save</Button></>
            }
            <Button className="cancelProfilePic__btn" onClick={() => this.setState({ showModal: false })}>cancel</Button>
          </Modal.Content>
        </Modal>
{
  this.props.gameNight.date && this.props.gameNight.time && this.props.gameNight.name
    ? <><Header className="nextGameNight__header">next game night:</Header>
      <div className="profileGameNight__div">
        <p className="gameNightCard__date"><Icon name="calendar outline"></Icon> {new Date(this.props.gameNight.date).toDateString().toUpperCase()}, {new Date(this.props.gameNight.date_and_time).toLocaleTimeString(undefined, { timeStyle: "short" })}</p>
        <h3 className="gameNightCard__name">{this.props.gameNight.name}</h3>
        <p>created by: {this.props.gameNight.user ? this.props.gameNight.user.username : null}</p>
        <div className="gameNightCardLocation__div"><Icon name="point" size="large" className="gameNightCardLocation__icon" /><p className="gameNightCardLocation__text">{this.props.gameNight.location}</p></div>
      </div></>
    : null
}
      </div >
    )
  }
}

export default UserInfoCard