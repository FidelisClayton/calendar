import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import dateFns from 'date-fns'

import './Calendar.css'
import Day from './Day'

class Calendar extends PureComponent {
  isDateWithin = (day) => (event) => {
    return dateFns.isWithinRange(day, event.startDate, event.endDate || event.startDate)
  }

  renderDays () {
    const startOfMonth = dateFns.startOfMonth(this.props.currentDate)
    const endOfMonth = dateFns.endOfMonth(this.props.currentDate)
    const startOfFirstWeek = dateFns.startOfWeek(startOfMonth)
    const endOfLastWeek = dateFns.endOfWeek(endOfMonth)

    let days = []
    let day = startOfFirstWeek

    while (day <= endOfLastWeek) {
      const eventsForThisDay =
        this.props.events.filter(this.isDateWithin(day))

      days.push(
        <Day
          key={day}
          day={day}
          disabled={!dateFns.isSameMonth(day, startOfMonth)}
          events={eventsForThisDay}
          onClick={this.props.handleClickDay}
          onClickEvent={this.props.handleClickEvent}
        />
      )

      day = dateFns.addDays(day, 1)
    }

    return days
  }

  render () {
    return (
      <section className="calendar">
        <div className="calendar__header">
          <div className="calendar__day-name">
            Sunday
          </div>
          <div className="calendar__day-name">
            Monday
          </div>
          <div className="calendar__day-name">
            Tuesday
          </div>
          <div className="calendar__day-name">
            Wednesday
          </div>
          <div className="calendar__day-name">
            Thursday
          </div>
          <div className="calendar__day-name">
            Friday
          </div>
          <div className="calendar__day-name">
            Saturday
          </div>
        </div>

        <div className="calendar__days">
          { this.renderDays() }
        </div>
      </section>
    )
  }
}

Calendar.propTypes = {
  currentDate: PropTypes.instanceOf(Date).isRequired
}

export default Calendar
