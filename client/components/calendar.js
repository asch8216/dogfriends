import React from 'react'
import {fetchDates, postDates} from '../store/dates'
import {connect} from 'react-redux'
import Loading from './loading'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import SubmitButton from './submit-button'

//import {Calendar} from '@fullcalendar/core'
//import interactionPlugin from '@fullcalendar/interaction'

import './main.scss' // webpack must be configured to do this

let dates = []

class Calendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dates: dates
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDateClick = this.handleDateClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchDates()
  }
  handleSubmit(event) {
    console.log('handlesubmit called')
    event.preventDefault()
    this.props.postDates(this.state, this.props.user)
    this.setState({dates: []})
  }
  returnDates() {
    return this.props.dates.map(date => ({title: 'away', date: date.date}))
  }
  handleDateClick = info => {
    dates.indexOf(info.dateStr) >= 0
      ? dates.splice(dates.indexOf(info.dateStr), 1)
      : dates.push(info.dateStr)
    console.log(info)
    info.dayEl.style.backgroundColor === 'lightgray'
      ? (info.dayEl.style.backgroundColor = '')
      : (info.dayEl.style.backgroundColor = 'lightgray')
    this.setState({dates: dates})
    console.log('state', this.state.dates)
  }

  render() {
    console.log('props', this.props)
    return (
      <div>
        <div>
          <form>
            <button
              type="submit"
              className="add-button"
              // onSubmit={this.handleSubmit(event)}
            >
              Submit
            </button>
          </form>
        </div>
        <div>
          <FullCalendar
            dateClick={this.handleDateClick}
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin, interactionPlugin]}
            events={this.returnDates()}
          />
        </div>
      </div>
    )
  }
}
// events={[
//   this.props.dates.map(date => ({title: 'away', date: date.date}))
// ]}

const mapStateToProps = state => {
  return {
    dates: state.datesReducer.dates,
    user: state.user.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDates: () => dispatch(fetchDates()),
    postDates: date => dispatch(postDates(date))
  }
}

const ConnectedCalendar = connect(mapStateToProps, mapDispatchToProps)(Calendar)
export default ConnectedCalendar
