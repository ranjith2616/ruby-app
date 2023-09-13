import './index.css'

import {AiFillStar} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'
import {HiOutlineLocationMarker} from 'react-icons/hi'

const SimilarCard = props => {
  const {similarJob} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJob

  return (
    <li className="list-similar-jobs">
      <div className="heading-card">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-img"
        />
        <div>
          <h1 className="job-title"> {title}</h1>
          <p>
            {' '}
            <AiFillStar className="icons" /> {rating}
          </p>
        </div>
      </div>

      <h1 className="description-text"> Description</h1>
      <p> {jobDescription}</p>

      <div className="bottom-card">
        <p className="location">
          {' '}
          <HiOutlineLocationMarker /> {location}
        </p>
        <p>
          {' '}
          <BsFillBriefcaseFill /> {employmentType}
        </p>
      </div>
    </li>
  )
}

export default SimilarCard
