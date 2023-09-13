import './index.css'

import {AiFillStar} from 'react-icons/ai'

import {BsFillBriefcaseFill} from 'react-icons/bs'
import {HiOutlineLocationMarker, HiExternalLink} from 'react-icons/hi'

const DetaildJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    companyWebsiteUel,
    employmentType,
    jobDescription,
    packagePerAnnum,
    rating,
    title,
    location,
    skills,
    lifeAtCompany,
  } = jobDetails

  return (
    <div>
      <div className="job-card-container">
        <div className="company-card">
          <img
            src={companyLogoUrl}
            alt="job details company logo"
            className="company-logo-img"
          />

          <div>
            <h1 className="company-heading"> {title}</h1>
            <p className="rating">
              {' '}
              <AiFillStar className="icons" /> {rating}
            </p>
          </div>
        </div>
        <div className="location-salary-card">
          <div className="location-card">
            <p>
              {' '}
              <HiOutlineLocationMarker /> {location}
            </p>

            <p>
              {' '}
              <BsFillBriefcaseFill /> {employmentType}
            </p>
          </div>
          <p> {packagePerAnnum}</p>
        </div>
        <hr />

        <div>
          <div className="visit-card">
            <h1 className="description-heading"> Description</h1>
            <p className="visit-text">
              {' '}
              <a href={companyWebsiteUel} target="b_blank">
                {' '}
                Visit <HiExternalLink className="link-visit" />
              </a>
            </p>
          </div>

          <p> {jobDescription}</p>
          <h1 className="skills-heading"> Skills</h1>
          <ul className="skills-list-container">
            {skills.map(each => (
              <li key={each.name} className="list-of-skills">
                {' '}
                <img
                  src={each.imageUrl}
                  alt={each.name}
                  className="skills-images"
                />
                <p> {each.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h1> Life at Company</h1>
          <div className="life-at-company-card">
            <p> {lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetaildJobCard
