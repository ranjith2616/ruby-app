import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'LOADING',
}

class Profile extends Component {
  state = {profileData: [], apiStatus: apiStatusConst.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apiStatusConst.inprogress})

    const token = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const updateData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileData: updateData,
        apiStatus: apiStatusConst.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  renderProfileField = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div>
        <div className="profile-bg-container">
          <img src={profileImageUrl} alt=" profile" className="profile-img" />
          <h1 className="profile-name"> {name}</h1>
          <p>{shortBio}</p>
        </div>
      </div>
    )
  }

  renderInprogress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div>
      <button type="button" onClick={this.retryBtn}>
        {' '}
        Retry
      </button>
    </div>
  )

  retryBtn = () => {
    this.getProfileDetails()
  }

  renderProfileRoute = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConst.inprogress:
        return this.renderInprogress()
      case apiStatusConst.success:
        return this.renderProfileField()
      case apiStatusConst.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return <> {this.renderProfileRoute()} </>
  }
}

export default Profile
