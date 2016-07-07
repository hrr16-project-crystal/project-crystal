import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './calendarActions';
import moment from 'moment';
import Header from '../App/Header';
import Footer from '../App/Footer';
import BigCalendar from 'react-big-calendar';
import CreateEvent from './CreateEvent';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import find from 'lodash/find';
import merge from 'lodash/merge'; 

class Calendar extends Component {
  constructor(props) {
    super(props);
    // Used to store the state for Material-UI Dialog component and
    // and for the selectEvent prop in BigCalendar
    this.state = {
      open: false,
      eventBox: '',
    };
    // Bind all class functions to the class for use throughout the component
    this.deleteEvent = this.deleteEvent.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
  }

  // Populate the calendar with all events for the couple on initial render
  componentWillMount() {
    this.props.fetchEvents(this.props.user.data.couple_id);
  }

  componentDidMount(){
    /** RF: This involves race conditions, assumes fetchEvents populates props quickly enough... 
    Possibly place in better lifecycle hook.. */
    if (this.props.params.eventId && this.props.events.data) {
      this.setState({
        open: true,
        eventBox: find(this.props.events.data, { event_id: parseInt(this.props.params.eventId) }),
      });
    }
  }


  // Get all events for the couple
  getEvents() {
    // Get all events from state and format them in a way in that can be read by the BigCalendar
    const eventsArr = this.props.events.data;
    for (let i = 0; i < eventsArr.length; i++) {
      let tempStart = eventsArr[i].start_date;
      let tempEnd = eventsArr[i].end_date;
      tempStart = new Date(tempStart);
      tempEnd = new Date(tempEnd);
      eventsArr[i].start = tempStart;
      eventsArr[i].end = tempEnd;
    }
    // This is what gets passed into the events of the BigCalendar component
    return eventsArr;
  }

  // Delete the event that was clicked on then re-render the new updated events
  deleteEvent() {
    this.props.deleteEvent(this.state.eventBox.event_id);
    setTimeout(() => {
      this.props.fetchEvents(this.props.user.data.couple_id);
    }, 350);
  }

  // Change the state to allow Dialog component to open
  handleDialogOpen() {
    this.setState({ open: true });
  }

  // Change the state to allow Dialog component to close
  handleDialogClose() {
    this.setState({ open: false });
  }

  // Formats dates into user friendly format on the event pop-up (click)
  formatDate(time) {
    return moment(time).format('MMMM Do @ h:mmA');
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
    // Defines the action for the Dialog component
    const actions = [
      // Cancel button to close Dialog
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleDialogClose}
      />,
      // Delete button when clicked will trigger delete and close the Dialog
      <FlatButton
        label="Delete"
        primary={true}
        keyboardFocused={true}
        onTouchTap={() => { this.deleteEvent(); this.handleDialogClose(); }}
      />,
    ];
    return (
      // Dialog component for the event pop-up on user click. Only appears when user clicks event
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
      {/* Default render: Renders the Header, CreateEvent button, and BigCalendar */}
        <div>
          <Header />
          
          <h1>The url router filter should be: {this.props.params.eventId ? this.props.params.eventId : 'it didnt have anything'}</h1>
        
          <div className="container">
            <CreateEvent />
            <BigCalendar
              selectable
              formats={{ weekHeaderFormat: 'ddd MM DD' }}
              events={this.getEvents()}
              style={{ border: '1px solid #4dd0e1', height: '600px', marginTop: '48px' }}
              onSelectEvent={event => this.setState({ open: true, eventBox: event })}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

// Connect the state with props for all events and each event
const mapStateToProps = state => {
  return { events: state.calendar.events, user: state.auth.user };
};

// Hook up this component with the State and Actions
export default connect(mapStateToProps, actions)(Calendar);
