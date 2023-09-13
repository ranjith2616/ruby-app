import './index.css'

import Cookies from 'js-cookie'

import {FaHome, FaBriefcase} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'

import {Link, withRouter} from 'react-router-dom'

const Header = props => {
  const onLogOutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <nav className="nav">
      <div>
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
        </Link>
      </div>
      <ul className="nav-items-lg">
        <div className="link-container">
          <Link to="/" className="link-item">
            {' '}
            <li> Home</li>
          </Link>
          <Link to="/jobs" className="link-item">
            {' '}
            <li> Jobs</li>
          </Link>
        </div>
        <button type="button" className="log-out-btn" onClick={onLogOutBtn}>
          {' '}
          Logout
        </button>
      </ul>

      <ul className="nav-items-sm">
        <Link to="/">
          {' '}
          <li>
            {' '}
            <FaHome className="icon" />
          </li>
        </Link>
        <Link to="/jobs">
          {' '}
          <li>
            {' '}
            <FaBriefcase className="icon" />
          </li>
        </Link>

        <li>
          <button type="button" className="log-btn-icon" onClick={onLogOutBtn}>
            {' '}
            <FiLogOut className="icon" />
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
