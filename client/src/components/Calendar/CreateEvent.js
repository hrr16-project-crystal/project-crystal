import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from './calendarActions';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import ActionToday from 'material-ui/svg-icons/action/today';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './calendar.css';

const DateTimeFormat = global.Intl.DateTimeFormat;

class CreateEvent extends Component {
  constructor(props) {
    super(props);
    // Used to store the state for Material-UI Dialog component and
    this.state = { open: false };
    // Bind all class functions to the class for use throughout the component
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  // Change the state to allow Dialog component to open
  handleDialogOpen() {
    this.setState({ open: true });
  }

  // Change the state to allow Dialog component to close
  handleDialogClose() {
    this.setState({ open: false });
  }

  // When user submits the form, run this function
  handleFormSubmit(formProps) {
    // Closes the Dialog component
    this.setState({ open: false });
    // Create the event with the appropriate values to send back to server/database
    const event = {
      title: '',
      start: '',
      end: '',
      category: '',
      description: '',
    };
    // Iterate through the formProps and set the initial values of event to post
    for (const key in formProps) {
      if (key === 'title') {
        event.title = formProps[key];
      }
      if (key === 'startDate') {
        // Split the date into an array of each type of value (i.e. Year, Month, etc.)
        const tempSD = formProps[key].toString().split(' ');
        // Set the start property equal to the year, month, and day only
        event.start = `${tempSD[3]}, ${tempSD[1]}, ${tempSD[2]}, `;
      }
      if (key === 'startTime') {
        // Split the date into an array of each type of value (i.e. Year, Hour, etc.)
        const tempST = formProps[key].toString().split(' ');
        // Get the hours and minutes into its own array
        const otherTempST = tempST[4].split(':');
        // Add the time to the existing start date
        if (otherTempST[1] === '00') {
          event.start += `${otherTempST[0]}, 0`;
        } else {
          event.start += `${otherTempST[0]}, ${otherTempST[1]}`;
        }
      }
      if (key === 'endDate') {
        // Split the date into an array of each type of value (i.e. Year, Month, etc.)
        const tempED = formProps[key].toString().split(' ');
        // Set the end property equal to the year, month, and day only
        event.end = `${tempED[3]}, ${tempED[1]}, ${tempED[2]}, `;
      }
      if (key === 'endTime') {
        // Split the date into an array of each type of value (i.e. Year, Hour, etc.)
        const tempET = formProps[key].toString().split(' ');
        // Get the hours and minutes into its own array
        const otherTempET = tempET[4].split(':');
        // Add the time to the existing start date
        if (otherTempET[1] === '00') {
          event.end += `${otherTempET[0]}, 0`;
        } else {
          event.end += `${otherTempET[0]}, ${otherTempET[1]}`;
        }
      }
      if (key === 'category') {
        event.category = formProps[key];
      }
      if (key === 'description') {
        event.description = formProps[key];
      }
    }
    // Coerce the start and end dates/times in a way that can be read by the JavaScript date object
    const tempSt = event.start.split(',');
    const temporaryS = `${tempSt[0]}-${tempSt[1]}-${tempSt[2]} ${tempSt[3]}:${tempSt[4]}`;
    const tempEnd = event.end.split(',');
    const temporaryE = `${tempEnd[0]}-${tempEnd[1]}-${tempEnd[2]} ${tempEnd[3]}:${tempEnd[4]}`;
    // Use Moment.js to return the Unix timestamp of the start and end date
    const startD = Number(moment(temporaryS).format('x'));
    const endD = Number(moment(temporaryE).format('x'));
    // Pass the Unix timestamp to Date object to have the server calculate the time properly
    event.start = new Date(startD);
    event.end = new Date(endD);

    // Set the couple ID of the event to send to server/database
    event.coupleID = this.props.user.data.couple_id;

    // Create the new event and then re-render the events to the calendar to see the new event
    this.props.createEvent(event);
    setTimeout(() => {
      this.props.fetchEvents(this.props.user.data.couple_id);
    }, 350);
  }

  render() {
    // Make handleSubmit and all fields available as just handleSubmit or title/endTime/etc...
    const { handleSubmit, fields: {
      title, startDate, startTime, endDate, endTime, category, description } } = this.props;

    // Set dialog actions with a button for submitting the form
    const dialogActions = [
      <button
        form="eventForm"
        action="submit"
        className="btn btn-primary waves-effect waves-light"
      >Submit
      </button>,
    ];

    const buttonStyle = {
      marginTop: 36,
      width: '13%',
    };
    // Lines 141-206 all implement the form for this component. Uses a button that when clicked
    // will open a dialog with the form rendered. On submit, it will call handleFormSubmit
    return (
      <div className="center-align">
        <RaisedButton
          label="Create"
          icon={<ActionToday />}
          style={buttonStyle}
          backgroundColor="#26a69a"
          onTouchTap={this.handleDialogOpen}
        />
        <Dialog
          title="Create Your Event"
          actions={dialogActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleDialogClose}
        >
          <form id="eventForm" onSubmit={handleSubmit(this.handleFormSubmit)}>
            <div>
              <input type="text" placeholder="Title" {...title} />
              <DatePicker
                autoOk={true}
                hintText="Please select a start date"
                formatDate={new DateTimeFormat('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).format}
                onChange={(x, event) => startDate.onChange(event)}
              />
              <TimePicker
                hintText="Please select a start time"
                onChange={(x, event) => startTime.onChange(event)}
              />
              <DatePicker
                autoOk={true}
                hintText="Please select an end date"
                formatDate={new DateTimeFormat('en-US', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                }).format}
                onChange={(x, event) => endDate.onChange(event)}
              />
              <TimePicker
                hintText="Please select an end time"
                onChange={(x, event) => endTime.onChange(event)}
              />
              <RadioButtonGroup {...category}>
                <RadioButton
                  value="Dinner" label="Dinner"
                  style={{ display: 'inline-block', width: '150px' }}
                />
                <RadioButton
                  value="Activity" label="Activity"
                  style={{ display: 'inline-block', width: '150px' }}
                />
                <RadioButton
                  value="Family" label="Family"
                  style={{ display: 'inline-block', width: '150px' }}
                />
              </RadioButtonGroup>
              <input type="text" placeholder="Description" {...description} />
            </div>
          </form>
        </Dialog>
      </div>

    );
  }
}

// Connect the state with props for all events and each event
const mapStateToProps = state => {
  return { event: state.calendar.event, user: state.auth.user };
};

// Uses reduxForm to connect the form of this component with the state and actions
export default reduxForm({
  form: 'eventForm',
  fields: ['title', 'startDate', 'startTime', 'endDate', 'endTime', 'category', 'description'],
}, mapStateToProps, actions)(CreateEvent);
