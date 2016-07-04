import { expect } from '../testHelper';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import TodoList from '../../components/ToDo/TodoList';
import TodoAdd from '../../components/ToDo/TodoAdd';
import Header from '../../components/App/Header';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('TodoList', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      todo: { todos: { data: [ {}, {} ] } },
      auth: { user: { data: { couple_id: 1 } } },
      calendar: {},
      form: {},
      messages: {},
      quiz: {},
      meter: {},
    });
  });

  it('should render a TodoAdd component', () => {
    const wrapper = mount(<Provider store={store}>
      <TodoList /></Provider>);
    expect(wrapper.find(TodoAdd)).to.have.length(0);
  });

  it('should render a Header component', () => {
    const wrapper = mount(<Provider store={store}>
      <TodoList /></Provider>);
    expect(wrapper.find(Header)).to.have.length(0);
  });

  it('should call getTodos', () => {
    const wrapper = shallow(<Provider store={store}><TodoList /></Provider>);
    expect(wrapper.props().getTodos).to.be.called;
  });

  it('should have props for opening and closing the dialog', () => {
    const wrapper = shallow(<Provider store={store}><TodoList /></Provider>);
    expect(wrapper.props().handleDialogOpen).to.be.defined;
    expect(wrapper.props().handleDialogClose).to.be.defined;
  });
});

describe('Create Todo', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      todo: { todos: { data: [{ content: 'My Todo' }, { content: 'Your Todo' }] } },
      auth: { user: { data: { couple_id: 1 } } },
      calendar: {},
      form: {},
      messages: {},
      quiz: {},
      meter: {},
    });
  });

  it('should have props for opening and closing the dialog', () => {
    const wrapper = shallow(<Provider store={store}><TodoAdd /></Provider>);
    expect(wrapper.props().handleDialogOpen).to.be.defined;
    expect(wrapper.props().handleDialogClose).to.be.defined;
  });

  it('should have props handleFormSubmit', () => {
    const wrapper = shallow(<Provider store={store}><TodoAdd /></Provider>);
    expect(wrapper.props().handleFormSubmit).to.be.defined;
  });

});
