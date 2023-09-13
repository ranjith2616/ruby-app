import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import DetaildJobCard from '../DetaildJobCard'
import SimilarCard from '../SimilarCard'
import './index.css'

const apiStatusConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'INPROGRESS',
}

class DetailedJobDetails extends Component {
  state = {detailedData: [], apiStatus: apiStatusConst.initial}

  componentDidMount() {
    this.getDetailedJObDetails()
  }

  getDetailedJObDetails = async () => {
    this.setState({apiStatus: apiStatusConst.inprogress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const updateJobDetails = {
        jobDetails: {
          id: data.job_details.id,
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUel: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          jobDescription: data.job_details.job_description,
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          title: data.job_details.title,

          lifeAtCompany: {
            imageUrl: data.job_details.life_at_company.image_url,
            description: data.job_details.life_at_company.description,
          },

          skills: data.job_details.skills.map(each => ({
            imageUrl: each.image_url,
            name: each.name,
          })),
        },

        similarJobs: data.similar_jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        })),
      }

      this.setState({
        detailedData: updateJobDetails,
        apiStatus: apiStatusConst.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  renderJobDetails = () => {
    const {detailedData} = this.state
    const {jobDetails, similarJobs} = detailedData

    return (
      <div>
        <DetaildJobCard jobDetails={jobDetails} />
        <h1> Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(each => (
            <SimilarCard key={each.id} similarJob={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderInprogress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetryButton = () => {
    this.getDetailedJObDetails()
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />{' '}
      <h1> Oops! Something Went Wrong</h1>
      <p> We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.onClickRetryButton}>
        {' '}
        Retry
      </button>
    </div>
  )

  renderJobDetailsRoute = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConst.success:
        return this.renderJobDetails()
      case apiStatusConst.inprogress:
        return this.renderInprogress()
      case apiStatusConst.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />

        <div className="detail-bg-container">
          {this.renderJobDetailsRoute()}
        </div>
      </>
    )
  }
}

export default DetailedJobDetails
