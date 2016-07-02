import { expect } from '../testHelper';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Header from '../../components/App/Header';
import Signup from '../../components/Authentication/Signup';
import Signin from '../../components/Authentication/Signin';

import Dialog from 'material-ui/Dialog';

import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const MUI = getMuiTheme();

describe('Signup', () => {
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

  it('should contain a form to handle user input', () => {
    const wrapper = mount(<Provider store={store}><Signup /></Provider>);
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('should have props handleFormSubmit', () => {
    const wrapper = shallow(<Provider store={store}><Signup /></Provider>);
    expect(wrapper.props().handleFormSubmit).to.be.defined;
  });

  it('should have props for renderAlert', () => {
    const wrapper = shallow(<Provider store={store}><Signup /></Provider>);
    expect(wrapper.props().renderAlert).to.be.defined;
  });
});

describe('Signin', () => {
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

  it('should contain a form to handle user input', () => {
    const wrapper = mount(<Provider store={store}><Signup /></Provider>);
    expect(wrapper.find('form')).to.have.length(1);
  });

  it('should have props handleFormSubmit', () => {
    const wrapper = shallow(<Provider store={store}><Signup /></Provider>);
    expect(wrapper.props().handleFormSubmit).to.be.defined;
  });

  it('should have props for renderAlert', () => {
    const wrapper = shallow(<Provider store={store}><Signup /></Provider>);
    expect(wrapper.props().renderAlert).to.be.defined;
  });
});
