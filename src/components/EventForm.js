import React, { Component } from 'react'
import dateFns from 'date-fns'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const initialState = {
  name: '',
  location: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  isMultipleDays: false
}

class EventForm extends Component {
  state = initialState

  componentDidMount () {
    if (this.props.editing) {
      this.setState({
        ...this.props.event
      })
    } else {
      this.setState({
        endDate: new Date()
      })
    }
  }

  handleFormChange = (event) => {
    const { type, value, name, checked } = event.target

    let parsedValue = value

    if (type === 'number') {
      parsedValue = Number(value) || 0
    } else if (type === 'checkbox') {
      parsedValue = checked
    }

    this.setState({
      ...this.state,
      [name]: parsedValue
    })
  }

  handledEndDateChange = (date) => {
    this.setState({
      ...this.state,
      endDate: date
    })
  }

  handledStartDateChange = (date) => {
    this.setState({
      ...this.state,
      startDate: date
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    this.setState(initialState)
    if (this.props.editing) {
      this.props.edit({ ...this.state })
    } else {
      this.props.create({
        ...this.state,
        startDate: this.props.startDate,
        endDate: this.state.isMultipleDays
          ? this.state.endDate
          : this.props.startDate
      })
    }
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{ dateFns.format(this.props.startDate, 'DD MMMM YYYY') }</h1>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            onChange={this.handleFormChange}
            name="name"
            value={this.state.name}
            defaultValue={this.props.event.name}
            required
          />
        </div>

        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            onChange={this.handleFormChange}
            name="location"
            value={this.state.location}
            required
          />
        </div>

        { this.props.editing && (
          <div className="form-group">
            <label>Start Date</label>
            <DatePicker
              selected={new Date(this.state.startDate)}
              onChange={this.handledStartDateChange}
            />
          </div>
        )}

        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            onChange={this.handleFormChange}
            name="startTime"
            value={this.state.startTime}
            required
          />
        </div>

        <div className="form-group">
          <label>Multiple days?</label>
          <input
            type="checkbox"
            onChange={this.handleFormChange}
            name="isMultipleDays"
            checked={this.state.isMultipleDays}
          />
        </div>

        { this.state.isMultipleDays && (
          <React.Fragment>
            <div className="form-group">
              <label>End Date</label>
              <DatePicker
                selected={this.state.endDate ? new Date(this.state.endDate) : new Date()}
                onChange={this.handledEndDateChange}
              />
            </div>

            <div className="form-group">
              <label>End Time</label>
              <input
                type="time"
                onChange={this.handleFormChange}
                name="endTime"
                value={this.state.endTime}
              />
            </div>
          </React.Fragment>
        )}

        { this.props.editing
            ? <button className="c-button">Update Event</button>
            : <button className="c-button">Create Event</button>
        }
      </form>
    )
  }
}

export default EventForm
