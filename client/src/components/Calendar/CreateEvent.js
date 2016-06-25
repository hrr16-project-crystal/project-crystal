import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from './createEventActions';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
    console.log(formProps);
    // console.log(typeof formProps.startDate);
    // console.log(formProps.startDate);
    this.props.createEvent(formProps);
    // TODO: Look into fixing the start and end dates/times.
    // right now there are two properties. Can possibly merge into just one
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
                autoOK={true}
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
                autoOk={true}
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
