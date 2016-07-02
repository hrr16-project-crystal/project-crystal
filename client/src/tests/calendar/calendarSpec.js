import { expect } from '../testHelper';
import React from 'react';
// import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Calendar from '../../components/Calendar/Calendar';
import CreateEvent from '../../components/Calendar/CreateEvent';
import CalendarCard from '../../components/Calendar/CalendarCard';
import Header from '../../components/App/Header';
import BigCalendar from 'react-big-calendar';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import thunk from 'redux-thunk';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
// const MUI = getMuiTheme();

// describe('Calendar', () => {
//   let component;
//   beforeEach(() => {
//     const props = { calendar: { events: { data: [{ title: 'event1' }, { title: 'event2' }] } },
//     auth: { user: { data: { couple_id: 1 } } } };
//     component = renderComponent(Calendar, null, props);
//     console.log('=========');
//     console.log('hello', component);
//   });

//   it('should show each event that is provided', () => {
//     console.log('helloo')
//     console.log('bye', component);
//     expect(component).to.contain({ title: 'event1' });
//     expect(component).to.contain({ title: 'event2' });
//   });
// });

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

  it('should render one <CreateEvent /> components', () => {
    const wrapper = shallow(<Provider store={store}><Calendar /></Provider>);
    expect(wrapper.find('div')).to.exist;
  });

  xit('call componentWillMount', () => {
    const spy = sinon.spy(Calendar.prototype, 'componentWillMount');
    const wrapper = mount(<Calendar />, { context: { store: store } });
    // const wrapper = mount(<Provider store={store}>
      // <MuiThemeProvider muiTheme={MUI}><Calendar /></MuiThemeProvider></Provider>);
    expect(spy.calledOnce).to.equal(true);
    // Calendar.prototype.componentWillMount.restore();
  });

  xit('should render a Header', () => {
    const wrapper = shallow(<Calendar />);
    expect(wrapper.find(Header)).to.have.length(1);
  });

  xit('should render the big calendar', () => {
    const wrapper = shallow(<Provider store={store}><Calendar /></Provider>);
    expect(wrapper.find(BigCalendar)).to.have.length(1);
  });

  it('should call fetch Events', () => {
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

  it('should render one form', () => {
    const wrapper = shallow(<Provider store={store}><Calendar /></Provider>);
    expect(wrapper.find('form')).to.exist;
  });

  it('should have props for opening and closing the dialog', () => {
    const wrapper = shallow(<Provider store={store}><Calendar /></Provider>);
    expect(wrapper.props().handleDialogOpen).to.be.defined;
    expect(wrapper.props().handleDialogClose).to.be.defined;
  });

  it('should have props handleFormSubmit', () => {
    const wrapper = shallow(<Provider store={store}><Calendar /></Provider>);
    expect(wrapper.props().handleFormSubmit).to.be.defined;
  });

  xit('should submit the form on click', () => {
    const onSubmit = sinon.spy();
    const wrapper = shallow(<CreateEvent onSubmit={onSubmit} />);
    wrapper.find('button').simulate('click');
    expect(onSubmit.calledOnce).to.equal(true);
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
