import React, { Component } from 'react';
import dateFns from 'date-fns'
import uuidv4 from 'uuid/v4'

import './App.css';

import Header from './components/Header'
import Calendar from './components/Calendar'
import EventForm from './components/EventForm'
import EventShow from './components/EventShow'
import Modal from './components/Modal'

const events = JSON.parse(window.localStorage.getItem('events'))

class App extends Component {
  state = {
    displayEventForm: false,
    displayEventShow: false,
    startDate: new Date(),
    currentDate: new Date(),
    editingEvent: false,
    events: events || [],
    event: {}
  }

  saveEventsOnLocalStorage = (events) => {
    window.localStorage.setItem('events', JSON.stringify(events))
  }

  nextMonth = () => {
    this.setState({ currentDate: dateFns.addMonths(this.state.currentDate, 1) })
  }

  previousMonth = () => {
    this.setState({ currentDate: dateFns.subMonths(this.state.currentDate, 1) })
  }

  showForm = () => {
    this.setState({ formVisible: true })
  }

  hideForm = () => {
    this.setState({ formVisible: false })
  }

  saveEvent = (event) => {
    const newEvents = [
      ...this.state.events,
      {
        id: uuidv4(),
        ...event
      }
    ]

    this.setState({
      displayEventForm: false,
      events: newEvents,
    })

    this.saveEventsOnLocalStorage(newEvents)
  }

  toggleEventForm = () => {
    this.setState({
      displayEventForm: !this.state.displayEventForm
    })
  }

  handleClickDay = (day) => {
    this.setState({
      displayEventForm: true,
      startDate: day
    })
  }

  toggleEventShow = () => {
    this.setState({
      displayEventShow: !this.state.displayEventShow
    })
  }

  handleClickEvent = (event) => {
    this.setState({
      event,
      displayEventShow: true
    })
  }

  deleteEvent = (eventId) => {
    const newEvents = this.state.events.filter(event => event.id !== eventId)

    this.setState({
      events: newEvents,
      displayEventShow: false
    })

    this.saveEventsOnLocalStorage(newEvents)
  }

  editEvent = (event) => {
    this.setState({
      event,
      editingEvent: true,
      displayEventForm: true,
      displayEventShow: false
    })
  }

  saveEditEvent = (updatedEvent) => {
    const newEvents = this.state.events.map(event => {
      if (event.id === updatedEvent.id) {
        return updatedEvent
      } else {
        return event
      }
    })

    this.setState({
      events: newEvents,
      displayEventForm: false,
      editingEvent: false
    })

    this.saveEventsOnLocalStorage(newEvents)
  }

  render() {
    return (
      <div className="app">
        { this.state.displayEventForm && (
          <Modal close={this.toggleEventForm}>
            <EventForm
              create={this.saveEvent}
              edit={this.saveEditEvent}
              startDate={this.state.startDate}
              editing={this.state.editingEvent}
              event={this.state.event}
            />
          </Modal>
        )}

        { this.state.displayEventShow && (
          <Modal close={this.toggleEventShow}>
            <EventShow
              event={this.state.event}
              deleteEvent={this.deleteEvent}
              editEvent={this.editEvent}
            />
          </Modal>
        )}

        <Header
          nextMonth={this.nextMonth}
          previousMonth={this.previousMonth}
          currentDate={this.state.currentDate}
        />
        <Calendar
          currentDate={this.state.currentDate}
          events={this.state.events}
          handleClickDay={this.handleClickDay}
          handleClickEvent={this.handleClickEvent}
        />
      </div>
    );
  }
}

export default App;
