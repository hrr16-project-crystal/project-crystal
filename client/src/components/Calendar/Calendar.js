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
// const testEvents = [
//   {
//     title: 'All Day Event',
//     allDay: true,
//     // Year, month, day, hours, minutes
//     start: new Date(2016, 5, 1, 18, 15),
//     end: new Date(2016, 5, 1, 21, 15)
//   },
//   {
//     title: 'Long Event',
//     allDay: true,
//     start: new Date(2016, 5, 7),
//     end: new Date(2016, 5, 10)
//   },

//   {
//     title: 'DTS STARTS',
//     start: new Date(2016, 6, 13, 0, 0, 0),
//     end: new Date(2016, 6, 20, 0, 0, 0)
//   },

//   {
//     title: 'DTS ENDS',
//     start: new Date(2016, 10, 6, 0, 0, 0),
//     end: new Date(2016, 10, 13, 0, 0, 0)
//   },

//   {
//     title: 'Some Event',
//     start: new Date(2016, 5, 9, 0, 0, 0),
//     end: new Date(2016, 5, 9, 0, 0, 0)
//   },
//   {
//     title: 'Conference',
//     start: new Date(2016, 5, 11, 10, 30),
//     end: new Date(2016, 5, 11, 12, 30),
//     desc: 'Big conference for important people'
//   },
//   {
//     title: 'Conference 2',
//     start: new Date(2016, 5, 11, 14, 45),
//     end: new Date(2016, 5, 11, 16, 0),
//     desc: 'Big conference 2 for important people'
//   },
//   {
//     title: 'Moment',
//     start: moment('2016 07 04 10 30').format(),
//     end: moment('2016 07 05 12 15').format(),
//   },
//   {
//     title: 'Moment',
//     start: moment().format('2016 07 04 10 30'),
//     end: moment().format('2016 07 05 12 15'),
//   },
// ];

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.getEvents = this.getEvents.bind(this);
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
  }
  componentWillMount() {
    this.props.fetchEvents();
  }

  getEvents() {
    console.log(this.props.events);
    const eventsArr = this.props.events;
    for (let i = 0; i < eventsArr.length; i++) {
      let tempStart = eventsArr[i].start;
      let tempEnd = eventsArr[i].end;
      tempStart = new Date(tempStart);
      tempEnd = new Date(tempEnd);
      console.log(tempStart);
      console.log(tempEnd);
      eventsArr[i].start = tempStart;
      eventsArr[i].end = tempEnd;
    }
    console.log('============');
    console.log(eventsArr);
    return eventsArr;
    // const result = [{
    //   title: 'Conference',
    //   start: new Date(Date.UTC(2016, 5, 11, 14, 45)),
    //   // start: new Date(2016, 5, 11, 10, 30),
    //   end: new Date(Date.UTC(2016, 5, 11, 16, 45)),
    //   // end: new Date(2016, 5, 11, 12, 30),
    //   desc: 'Big conference for important people',
    // }];
    // return result;
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
            // events={testEvents}
            style={{ border: '1px solid #26a69a' }}
            onSelectEvent={event => console.log(event.title + ' | ' + event.start + ' | ' + event.end)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { events: state.calendar.events };
};

export default connect(mapStateToProps, actions)(Calendar);
