import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './calendarActions';
import { Link } from 'react-router';
import moment from 'moment';

// Compare function to order the events by start date (oldest to newest)
const compareFunc = (a, b) => {
  const first = Number(moment(a.start_date).format('x'));
  const second = Number(moment(b.start_date).format('x'));
  if (first < second) {
    return -1;
  } else if (first > second) {
    return 1;
  } else {
    return 0;
  }
};

// Returns events where the date is after the current time
const isDateAfterToday = date => {
  const currentDate = Number(Date.now());
  return Number(moment(date.start_date).format('x')) >= currentDate;
};

class CalendarCard extends Component {
  componentWillMount() {
    this.props.fetchEvents(this.props.user.data.couple_id);
  }

  // Render events into boxes in the Calendar card
  renderEvents() {
    const events = this.props.events.data;
    events.sort(compareFunc);

    return events.filter(isDateAfterToday).splice(0, 3).map(eventObj => {
      const date = moment(eventObj.start_date).format('MMMM Do @ h:mmA');
      return (
        <div className="col s4">
          <div className="card blue-grey darken-1">
            <Link to="/calendar">
              <div className="card-content white-text">
                <span className="card-title">{eventObj.title}</span>
                <p>{date}</p>
                <p>{eventObj.description}</p>
              </div>
            </Link>
          </div>
        </div>
      );
    });
  }

  render() {
    // If there are no events yet, load a spinner
    if (!this.props.events) {
      return (
        <div className="center-align calendar-spinner">
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    // Call the renderEvents function and place each event into the calendar card
    return (
      <div className="col s7 card white">
        <h4 className="center-align">Upcoming Events</h4>
        <div className="row">
          {this.renderEvents()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { events: state.calendar.events, user: state.auth.user };
};

export default connect(mapStateToProps, actions)(CalendarCard);
