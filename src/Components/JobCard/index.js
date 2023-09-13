import './index.css'

import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'
import {HiOutlineLocationMarker} from 'react-icons/hi'

const JobCard = props => {
  const {jobDetails} = props
  const {
    title,
    companyLogoUrl,
    employmentMentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-card-item">
        <div className="company-card">
          <img
            src={companyLogoUrl}
            alt=" company logo"
            className="company-logo-img"
          />
          <div className="job-title-card">
            <h1 className="job-title"> {title}</h1>
            <p>
              {' '}
              <AiFillStar className="star-icon" /> {rating}
            </p>
          </div>
        </div>

        <div className="location-salary-card">
          <div className="location-card">
            <p className="location-type">
              {' '}
              <HiOutlineLocationMarker className="icons" /> {location}
            </p>
            <p>
              {' '}
              <BsFillBriefcaseFill /> {employmentMentType}
            </p>
          </div>
          <div>
            <p> {packagePerAnnum}</p>
          </div>
        </div>
        <hr />
        <div>
          <h1 className="description-text"> Description</h1>
          <p> {jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
