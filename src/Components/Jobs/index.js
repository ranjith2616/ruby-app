import './index.css'
import Profile from '../Profile'
import Header from '../Header'
import AllJobDetails from '../AllJobDetails'

const Jobs = () => (
  <>
    <Header />
    <div className="jobs-bg-container">
      <Profile />
      <AllJobDetails />
    </div>
  </>
)

export default Jobs
