import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import JobCard from '../JobCard'

import './index.css'

import FilterGroup from '../FilterGroup'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConst = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inprogress: 'LOADING',
}

class AllJobDetails extends Component {
  state = {
    jobsData: [],
    apiStatus: apiStatusConst.initial,
    selectedEmploymentType: [],
    salaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConst.inprogress})
    const token = Cookies.get('jwt_token')

    const {selectedEmploymentType, salaryRange, searchInput} = this.state

    const queryParams = `employment_type=${selectedEmploymentType.join(',')}`

    const url = `https://apis.ccbp.in/jobs`

    const newUrl = `${url}?${queryParams}&minimum_package=${salaryRange}&search=${searchInput}`

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(newUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const updateData = data.jobs.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentMentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({jobsData: updateData, apiStatus: apiStatusConst.success})
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  renderInprogress = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetryABtn = () => {
    this.setState({apiStatus: apiStatusConst.initial}, this.getJobDetails)
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1> Oops! Something Went Wrong</h1>
      <p> We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.onRetryABtn}>
        {' '}
        Retry
      </button>
    </div>
  )

  renderJobsDetails = () => {
    const {jobsData} = this.state
    const shouldShowProductsList = jobsData.length > 0

    return shouldShowProductsList ? (
      <ul className="job-item-list-container">
        {jobsData.map(eachJob => (
          <JobCard key={eachJob.id} jobDetails={eachJob} />
        ))}
      </ul>
    ) : (
      <div className="no-data-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-img"
        />
        <h1> No Jobs Found</h1>
        <p> We could not find any jobs. Try other filters</p>
      </div>
    )
  }

  renderAllJobDetailsRoute = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConst.inprogress:
        return this.renderInprogress()
      case apiStatusConst.success:
        return this.renderJobsDetails()
      case apiStatusConst.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  handleEmploymentTypeChange = id => {
    const {selectedEmploymentType} = this.state

    if (selectedEmploymentType.includes(id)) {
      const filterTheData = selectedEmploymentType.filter(each => each !== id)
      this.setState({selectedEmploymentType: filterTheData}, this.getJobDetails)
    } else {
      this.setState(
        prevState => ({
          selectedEmploymentType: [...prevState.selectedEmploymentType, id],
        }),
        () => {
          // Callback function is invoked after state is updated
          this.getJobDetails()
        },
      )
    }
  }

  handleSalaryChange = id => {
    this.setState({salaryRange: id}, this.getJobDetails)
  }

  searchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onSearchButton = () => {
    this.getJobDetails()
  }

  render() {
    return (
      <div>
        <FilterGroup
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          handleEmploymentTypeChange={this.handleEmploymentTypeChange}
          handleSalaryChange={this.handleSalaryChange}
          searchInput={this.searchInput}
          onSearchButton={this.onSearchButton}
        />
        {this.renderAllJobDetailsRoute()}
      </div>
    )
  }
}

export default AllJobDetails
