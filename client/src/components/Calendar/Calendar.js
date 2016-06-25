import React, { Component } from 'react';
import moment from 'moment';
import events from './events';
import Header from '../App/Header';
import BigCalendar from 'react-big-calendar';
import CreateEvent from './CreateEvent';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

// Note: JavaScript months go from 0-11 & edited css style sheet (not sure if edits went to GIT)
// CSS edits were the margin top of 48px and min-height of 600px on main calendar

export default class Calendar extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <CreateEvent />
          <BigCalendar
            selectable
            events={events}
            style={{ border: '1px solid #26a69a' }}
          />
        </div>
      </div>
    );
  }
}
