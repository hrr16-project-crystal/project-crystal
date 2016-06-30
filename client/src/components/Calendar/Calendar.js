import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './calendarActions';
import moment from 'moment';
import Header from '../App/Header';
import BigCalendar from 'react-big-calendar';
import CreateEvent from './CreateEvent';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

// Note: JavaScript months go from 0-11 & edited css style sheet (not sure if edits went to GIT)
// CSS edits were the margin top of 48px and min-height of 600px on main calendar
// TODO: add popup box with material-ui when clicking on event

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      eventBox: '',
    };
    this.deleteEvent = this.deleteEvent.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
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
  deleteEvent() {
    console.log('hiiiiii');
    // this.setState({ open: false });
  }

  handleDialogOpen() {
    this.setState({ open: true });
  }

  handleDialogClose() {
    this.setState({ open: false });
  }

  formatDate(time) {
    return moment(time).format('MMMM Do @ H:mmA');
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
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialogClose}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => { this.deleteEvent(); this.handleDialogClose(); }}
      />,
    ];
    return (
      <div>
        <div>
          <Dialog
            title="Event Details"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleDialogClose}
          >
            <div className="section">
              Title: {this.state.eventBox.title}
            </div>
            <div className="divider"></div>
            <div className="section">
              Start: {this.formatDate(this.state.eventBox.start)}
              <br />
              End: {this.formatDate(this.state.eventBox.end)}
            </div>
            <div className="divider"></div>
            <div className="section">
              Description: {this.state.eventBox.description}
            </div>
          </Dialog>
        </div>
        <div>
          <Header />
          <div className="container">
            <CreateEvent />
            <BigCalendar
              selectable
              formats={{ weekHeaderFormat: 'ddd MM DD' }}
              events={this.getEvents()}
              style={{ border: '1px solid #26a69a', height: '600px', marginTop: '48px' }}
              onSelectEvent={event => this.setState({ open: true, eventBox: event })}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { events: state.calendar.events, user: state.auth.user };
};

export default connect(mapStateToProps, actions)(Calendar);
