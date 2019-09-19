import React, { Component } from "react"
import { Image, Header, Icon, Modal, Button, Label } from "semantic-ui-react"
import ProfilePlaceholder from "../../images/profile_placeholder.png"
import UserManager from "../../modules/UserManager"
import * as firebase from "firebase/app";
import 'firebase/storage';

import "./UserInfoCard.css"
import "../game-nights/GameNightCard.css"

class UserInfoCard extends Component {
  state = {
    photo: null,
    uploading: false
  }

  componentDidMount() {
    this.props.getActiveUserName()
    this.props.getNextGameNight()
  }

  activeUser = parseInt(sessionStorage.getItem("activeUser"))

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
        console.log('url: ', url);
        return UserManager.addUserProfilePicture({
          id: this.activeUser,
          photoUrl: url
        })
          .then(() => this.setState({
            uploading: false,
            showModal: false
          }))
      })
    // Step 3: save everything to json-server
  }

  render() {
    return (
      <div className="userInfoCard__div">
          {
            this.props.profilePicture
              ? <Image className="uploadedProfile__img" src={this.props.profilePicture} />

              : <><Image className="profile__img" src={ProfilePlaceholder} />
                <Modal open={this.state.showModal} trigger={
                  <label onClick={() => this.setState({ showModal: true })} htmlFor="embedpollfileinput" className="ui button inputFile__label">
                    add profile picture</label>}>
                  <Modal.Content>
                    <input type="file" className="inputfile" id="embedpollfileinput" hidden onChange={this.onChange} />
                    {
                      this.state.uploading
                        ? <><p>Selected file: {this.state.photo.name}</p><Button onClick={this.handleSaveProfilePicBtnOnClick}>save</Button></>
                        : null
                    }
                  </Modal.Content>
                </Modal> </>
          }
        <Header className="profile__name">{this.props.username}</Header>
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