import React from 'react'
import dateFns from 'date-fns'

const dateFormat = 'DD MMMM YYYY - HH:MM'

const EventShow = ({ event, deleteEvent, editEvent }) => {
  const startWithTime = dateFns.format(event.startDate,'YYYY-MM-DD') + 'T' + (event.startTime || '00:00') + ':00'
  const endWithTime = dateFns.format(event.endDate,'YYYY-MM-DD') + 'T' + (event.endTime || '00:00') + ':00'

  return (
    <div className="event-show">
      <div className="event-show__info">
        <label>Name: </label>
        <span>{ event.name }</span>
      </div>

      <div className="event-show__info">
        <label>Location: </label>
        <span>{ event.location }</span>
      </div>

      <div className="event-show__info">
        <label>Start: </label>
        <span>{ dateFns.format(startWithTime, dateFormat) }</span>
      </div>

      { event.endDate && (
        <div className="event-show__info">
          <label>End: </label>
          <span>{ dateFns.format(endWithTime, dateFormat) }</span>
        </div>
      )}

      <button
        className="c-button"
        onClick={() => deleteEvent(event.id)}
      >
        Delete
      </button>

      <button
        className="c-button"
        onClick={() => editEvent(event)}
      >
        Edit
      </button>
    </div>
  )
}

export default EventShow
