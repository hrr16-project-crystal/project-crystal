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
    this.state = { open: false };
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleDialogOpen() {
    this.setState({ open: true });
  }

  handleDialogClose() {
    this.setState({ open: false });
  }

  handleFormSubmit(formProps) {
    this.setState({ open: false });
    const event = {
      title: '',
      start: '',
      end: '',
      category: '',
      description: '',
    };

    for (const key in formProps) {
      if (key === 'title') {
        event.title = formProps[key];
      }
      if (key === 'startDate') {
        const tempSD = formProps[key].toString().split(' ');
        event.start = tempSD[3] + ', ' + tempSD[1] + ', ' + tempSD[2] + ', ';
      }
      if (key === 'startTime') {
        const tempST = formProps[key].toString().split(' ');
        const otherTempST = tempST[4].split(':');
        if (otherTempST[1] === '00') {
          event.start += otherTempST[0] + ', 0';
        } else {
          event.start += otherTempST[0] + ', ' + otherTempST[1];
        }
      }
      if (key === 'endDate') {
        const tempED = formProps[key].toString().split(' ');
        event.end = tempED[3] + ', ' + tempED[1] + ', ' + tempED[2] + ', ';
      }
      if (key === 'endTime') {
        const tempET = formProps[key].toString().split(' ');
        const otherTempET = tempET[4].split(':');
        if (otherTempET[1] === '00') {
          event.end += otherTempET[0] + ', 0';
        } else {
          event.end += otherTempET[0] + ', ' + otherTempET[1];
        }
      }
      if (key === 'category') {
        event.category = formProps[key];
      }
      if (key === 'description') {
        event.description = formProps[key];
      }
    }
    const tempStart = event.start.split(',');
    const temporaryS = tempStart[0] + '-' + tempStart[1] + '-' + tempStart[2] + ' ' + tempStart[3] + ':' + tempStart[4];
    const tempEnd = event.end.split(',');
    const temporaryE = tempEnd[0] + '-' + tempEnd[1] + '-' + tempEnd[2] + ' ' + tempEnd[3] + ':' + tempEnd[4];
    const startD = Number(moment(temporaryS).format('x'));
    const endD = Number(moment(temporaryE).format('x'));
    event.start = new Date(startD);
    event.end = new Date(endD);
    
    this.props.createEvent(event);
    setTimeout(() => {
      this.props.fetchEvents();
    }, 1000);
  }

  render() {
    const { handleSubmit, fields: {
      title, startDate, startTime, endDate, endTime, category, description } } = this.props;

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
    // TODO: add more spacing between questions. Possibly reorganize to LI elements
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

const mapStateToProps = state => {
  return { event: state.calendar.event };
};

export default reduxForm({
  form: 'eventForm',
  fields: ['title', 'startDate', 'startTime', 'endDate', 'endTime', 'category', 'description'],
}, mapStateToProps, actions)(CreateEvent);
