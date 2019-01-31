import React from 'react'
import PropTypes from 'prop-types'
import dateFns from 'date-fns'
import classNames from 'classnames'
import ColorHash from 'color-hash'

import './Day.css'

const colorHash = new ColorHash({ lightness: 0.8 })

const Event = ({ event, onClick }) => (
  <div
    className="day__event"
    style={{ backgroundColor: colorHash.hex(event.id) }}
    onClick={() => onClick(event)}
  >
    { event.name }
  </div>
)


const Day = ({ day, disabled, events, onClick, onClickEvent }) => (
  <div className={classNames("day", { "day--disabled": disabled })}>
    <span className="day__number">{ dateFns.format(day, 'D') }</span>

    { events.map(event => (
      <Event
        key={event.id}
        event={event}
        onClick={onClickEvent}
      />
    ))}

    <div
      className="day__click-handler"
      onClick={() => onClick(day)}
    />
  </div>
)

Day.propTypes = {
  day: PropTypes.instanceOf(Date).isRequired,
  disabled: PropTypes.bool.isRequired
}

Day.defaultProps = {
  disabled: false
}

export default Day
