import React from 'react'
import PropTypes from 'prop-types'
import dateFns from 'date-fns'

import './Header.css'

const Header = ({ previousMonth, nextMonth, currentDate }) => (
  <header className="header">
    <button
      className="header__previous"
      onClick={previousMonth}
    >
      Previous
    </button>

    <h1 className="header__month">{ dateFns.format(currentDate, 'MMMM YYYY') }</h1>

    <button
      className="header__next"
      onClick={nextMonth}
    >
      Next
    </button>
  </header>
)

Header.propTypes = {
  previousMonth: PropTypes.func.isRequired,
  nextMonth: PropTypes.func.isRequired,
  currentDate: PropTypes.instanceOf(Date).isRequired
}

export default Header
