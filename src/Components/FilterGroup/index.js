import './index.css'

import {BsSearch} from 'react-icons/bs'

const FilterGroup = props => {
  const renderEmploymentList = () => {
    const {employmentTypesList} = props

    return employmentTypesList.map(eachEmployment => {
      const {handleEmploymentTypeChange} = props
      const onClickEmploymentType = id => handleEmploymentTypeChange(id)
      return (
        <li key={eachEmployment.employmentTypeId}>
          <input
            type="checkbox"
            id={eachEmployment.employmentTypeId}
            onClick={() =>
              onClickEmploymentType(eachEmployment.employmentTypeId)
            }
            value={eachEmployment.label}
            name={eachEmployment.label}
          />
          <label htmlFor={eachEmployment.employmentTypeId}>
            {' '}
            {eachEmployment.label}
          </label>
        </li>
      )
    })
  }

  const renderEmployment = () => (
    <>
      <h1 className="heading"> Type of Employment</h1>
      <ul className="list-container"> {renderEmploymentList()}</ul>
    </>
  )

  const renderSalaryRangeList = () => {
    const {salaryRangesList} = props

    return salaryRangesList.map(eachSalary => {
      const {handleSalaryChange} = props

      const onClickSalaryClick = () =>
        handleSalaryChange(eachSalary.salaryRangeId)

      return (
        <li key={eachSalary.salaryRangeId}>
          <input
            type="radio"
            id={eachSalary.salaryRangeId}
            name="salary"
            onClick={onClickSalaryClick}
          />
          <label htmlFor={eachSalary.salaryRangeId}> {eachSalary.label}</label>
        </li>
      )
    })
  }

  const renderSalaryRange = () => (
    <>
      <h1 className="heading"> Salary Range</h1>
      <ul className="list-container"> {renderSalaryRangeList()}</ul>
    </>
  )

  const onChangeSearchInput = event => {
    const {searchInput} = props
    searchInput(event)
  }

  const searchBtn = () => {
    const {onSearchButton} = props
    onSearchButton()
  }

  const renderSearchInput = () => (
    <div className="search-card">
      <input
        type="search"
        placeholder="Search"
        className="search-input"
        onChange={onChangeSearchInput}
      />
      <button
        type="button"
        data-testid="searchButton"
        className="search-btn"
        onClick={searchBtn}
      >
        <BsSearch className="search-icon" />
      </button>
    </div>
  )

  return (
    <div className="filter-bg-container">
      <div> {renderSearchInput()}</div>
      <div className="employment-salary-containers">
        <div>{renderEmployment()}</div>
        <div>{renderSalaryRange()}</div>
      </div>
    </div>
  )
}

export default FilterGroup
