import { expect } from '../testHelper';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Dashboard from '../../components/Dashboard/Dashboard';
import Header from '../../components/App/Header';
import CalendarCard from '../../components/Calendar/CalendarCard';
import ChatCard from '../../components/Chat/ChatCard';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import thunk from 'redux-thunk';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const MUI = getMuiTheme();

xdescribe('Dashboard', () => {
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

  it('should render a div for all child component', () => {
    const wrapper = mount(<Provider store={store}><Dashboard /></Provider>);
    expect(wrapper.find('div')).to.have.length(1);
  });

  it('should render a Header component', () => {
    const wrapper = mount(<Provider store={store}>
      <MuiThemeProvider muiTheme={MUI}><Dashboard /></MuiThemeProvider></Provider>);
    expect(wrapper.find(Header)).to.have.length(1);
  });

  it('call componentDidMount', () => {
    const spy = sinon.spy(Dashboard.prototype, 'componentDidMount');
    const wrapper = mount(<Dashboard />, { context: { store: store } });
    // const wrapper = mount(<Provider store={store}>
      // <MuiThemeProvider muiTheme={MUI}><Dashboard /></MuiThemeProvider></Provider>);
    expect(spy.calledOnce).to.equal(true);
    // Dashboard.prototype.componentDidMount.restore();
  });
});
