import { expect } from '../testHelper';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Calendar from '../../components/Calendar/Calendar';
import CreateEvent from '../../components/Calendar/CreateEvent';
import CalendarCard from '../../components/Calendar/CalendarCard';
import Header from '../../components/App/Header';
import BigCalendar from 'react-big-calendar';

import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const MUI = getMuiTheme();

describe('Calendar', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      calendar: { events: { data: [{ title: 'My Event' }, { title: 'Your Event' }] } },
      auth: { user: { data: { couple_id: 1 } } },
      form: {},
      messages: {},
      quiz: {},
      meter: {},
    });
  });

  it('should render a CreateEvent component', () => {
    const wrapper = mount(<Provider store={store}>
      <MuiThemeProvider muiTheme={MUI}><Calendar /></MuiThemeProvider></Provider>);
    expect(wrapper.find(CreateEvent)).to.have.length(1);
  });

  it('should render a Header component', () => {
    const wrapper = mount(<Provider store={store}>
      <MuiThemeProvider muiTheme={MUI}><Calendar /></MuiThemeProvider></Provider>);
    expect(wrapper.find(Header)).to.have.length(1);
  });

  it('should render the BigCalendar component', () => {
    const wrapper = mount(<Provider store={store}>
      <MuiThemeProvider muiTheme={MUI}><Calendar /></MuiThemeProvider></Provider>);
    expect(wrapper.find(BigCalendar)).to.have.length(1);
  });

  it('should call fetchEvents', () => {
    const wrapper = shallow(<Provider store={store}><Calendar /></Provider>);
    expect(wrapper.props().fetchEvents).to.be.called;
  });

  it('should have props for getEvent', () => {
    const wrapper = shallow(<Provider store={store}><Calendar /></Provider>);
    expect(wrapper.props().getEvents).to.be.defined;
  });

  it('should have props for deleteEvent', () => {
    const wrapper = shallow(<Provider store={store}><Calendar /></Provider>);
    expect(wrapper.props().deleteEvent).to.be.defined;
  });

  it('should have props for formatDate', () => {
    const wrapper = shallow(<Provider store={store}><Calendar /></Provider>);
    expect(wrapper.props().formatDate).to.be.defined;
  });
  it('should have props for opening and closing the dialog', () => {
    const wrapper = shallow(<Provider store={store}><Calendar /></Provider>);
    expect(wrapper.props().handleDialogOpen).to.be.defined;
    expect(wrapper.props().handleDialogClose).to.be.defined;
  });
});

describe('Create Event', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      calendar: { events: { data: [{ title: 'My Event' }, { title: 'Your Event' }] } },
      auth: { user: { data: { couple_id: 1 } } },
      form: {},
      messages: {},
      quiz: {},
      meter: {},
    });
  });

  it('should render one Diaglog', () => {
    const wrapper = mount(<Provider store={store}>
      <MuiThemeProvider muiTheme={MUI}><CreateEvent /></MuiThemeProvider></Provider>);
    expect(wrapper.find(Dialog)).to.have.length(1);
  });

  it('should render DatePicker components', () => {
    const wrapper = mount(<Provider store={store}>
      <MuiThemeProvider muiTheme={MUI}><CreateEvent /></MuiThemeProvider></Provider>);
    expect(wrapper.find(DatePicker)).to.exist;
  });

  it('should render TimePicker components', () => {
    const wrapper = mount(<Provider store={store}>
      <MuiThemeProvider muiTheme={MUI}><CreateEvent /></MuiThemeProvider></Provider>);
    expect(wrapper.find(TimePicker)).to.exist;
  });

  it('should render a RaisedButton component', () => {
    const wrapper = mount(<Provider store={store}>
      <MuiThemeProvider muiTheme={MUI}><CreateEvent /></MuiThemeProvider></Provider>);
    expect(wrapper.find(RaisedButton)).to.exist;
  });

  it('should render RadioButton components', () => {
    const wrapper = mount(<Provider store={store}>
      <MuiThemeProvider muiTheme={MUI}><CreateEvent /></MuiThemeProvider></Provider>);
    expect(wrapper.find(RadioButtonGroup)).to.have.exist;
    expect(wrapper.find(RadioButton)).to.have.exist;
  });

  it('should have props for opening and closing the dialog', () => {
    const wrapper = shallow(<Provider store={store}><CreateEvent /></Provider>);
    expect(wrapper.props().handleDialogOpen).to.be.defined;
    expect(wrapper.props().handleDialogClose).to.be.defined;
  });

  it('should have props handleFormSubmit', () => {
    const wrapper = shallow(<Provider store={store}><CreateEvent /></Provider>);
    expect(wrapper.props().handleFormSubmit).to.be.defined;
  });
});

describe('Calendar Card', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      calendar: { events: { data: [{ title: 'My Event' }, { title: 'Your Event' }] } },
      auth: { user: { data: { couple_id: 1 } } },
      form: {},
      messages: {},
      quiz: {},
      meter: {},
    });
  });

  it('should contain a header for the title of the card', () => {
    const wrapper = shallow(<Provider store={store}><CalendarCard /></Provider>);
    expect(wrapper.find('h4')).to.exist;
  });

  it('should have props renderEvents', () => {
    const wrapper = shallow(<Provider store={store}><CalendarCard /></Provider>);
    expect(wrapper.props().renderEvents).to.be.defined;
  });

  it('should call renderEvents', () => {
    const wrapper = shallow(<Provider store={store}><CalendarCard /></Provider>);
    expect(wrapper.props().renderEvents).to.be.called;
  });
});
