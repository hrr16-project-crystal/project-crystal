import { expect } from '../testHelper';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import App from '../../components/App/App';
import Header from '../../components/App/Header';

import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('App', () => {
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
    const wrapper = mount(<Provider store={store}><App /></Provider>);
    expect(wrapper.find('div')).to.have.length(1);
  });
});

describe('Header', () => {
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

  it('should render one nav', () => {
    const wrapper = mount(<Provider store={store}><Header /></Provider>);
    expect(wrapper.find('nav')).to.have.length(1);
  });

  it('should call renderLinks', () => {
    const wrapper = shallow(<Provider store={store}><Header /></Provider>);
    expect(wrapper.props().renderLinks).to.be.called;
  });
});

