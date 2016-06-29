import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './calendarActions';
import moment from 'moment';
import Header from '../App/Header';
import BigCalendar from 'react-big-calendar';
import CreateEvent from './CreateEvent';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

// Note: JavaScript months go from 0-11 & edited css style sheet (not sure if edits went to GIT)
// CSS edits were the margin top of 48px and min-height of 600px on main calendar
// TODO: add popup box with material-ui when clicking on event
class Calendar extends Component {
  constructor(props) {
    super(props);
    this.getEvents = this.getEvents.bind(this);
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
  }
  componentWillMount() {
    this.props.fetchEvents(this.props.user.data.couple_id);
  }

  getEvents() {
    // Function which gets all events from state and formats them in a
    // way in that can be read by the BigCalendar
    const eventsArr = this.props.events.data;
    for (let i = 0; i < eventsArr.length; i++) {
      let tempStart = eventsArr[i].start_date;
      let tempEnd = eventsArr[i].end_date;
      tempStart = new Date(tempStart);
      tempEnd = new Date(tempEnd);
      eventsArr[i].start = tempStart;
      eventsArr[i].end = tempEnd;
    }
    return eventsArr;
  }

  render() {
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
    return (
      <div>
        <Header />
        <div className="container">
          <CreateEvent />
          <BigCalendar
            selectable
            formats={{ weekHeaderFormat: 'ddd MM DD' }}
            events={this.getEvents()}
            style={{ border: '1px solid #26a69a' }}
            onSelectEvent={event => console.log(event.title + ' | ' + event.start + ' | ' + event.end)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { events: state.calendar.events, user: state.auth.user };
};

export default connect(mapStateToProps, actions)(Calendar);
