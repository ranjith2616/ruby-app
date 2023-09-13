import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class LogIn extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSuccessLogin = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    history.replace('/')

    this.setState({username: '', password: ''})
  }

  onFailureLogin = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  onChangeUserInput = event => {
    this.setState({username: event.target.value})
  }

  onChangePasswordInput = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    const {username, password, showSubmitError, errorMsg} = this.state

    return (
      <div>
        <form className="form" onSubmit={this.onSubmitForm}>
          <div className="form-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo-img"
            />
            <div className="input-card">
              <label htmlFor="username" className="label">
                {' '}
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input"
                placeholder="Username"
                value={username}
                onChange={this.onChangeUserInput}
              />
            </div>

            <div className="input-card">
              <label htmlFor="password" className="label">
                {' '}
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="input"
                placeholder="Password"
                value={password}
                onChange={this.onChangePasswordInput}
              />

              <button type="submit" className="login-btn">
                {' '}
                Login
              </button>
              {showSubmitError === true && (
                <p className="error-msg"> *{errorMsg}</p>
              )}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default LogIn
