import { expect } from '../testHelper';
import React from 'react';

import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Chat from '../../components/Chat/Chat';
import MessageList from '../../components/Chat/MessageList';
import ChatCard from '../../components/Chat/ChatCard';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import thunk from 'redux-thunk';
// import io from 'socket.io-client';
// const socket = io.connect();

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

xdescribe('Chat', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      calendar: { events: { data: [{ title: 'My Event' }, { title: 'Your Event' }] } },
      auth: { user: { data: { couple_id: 1 } } },
      form: {},
      messages: [{
        message_id: 1,
        user_id: 1,
        couple_id: 1,
        content: 'test',
        created_at: '2016-06-30T15:33:49.040Z',
        updated_at: '2016-06-30T15:33:49.040Z',
        },
        {
        message_id: 2,
        user_id: 1,
        couple_id: 1,
        content: 'cool',
        created_at: '2016-06-30T15:33:50.752Z',
        updated_at: '2016-06-30T15:33:50.752Z',
        },],
      quiz: {},
      meter: {},
    });
  });

  it('should render one <Chat /> component', () => {
    const wrapper = shallow(<Provider store={store}><Chat /></Provider>);
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

  it('should call fetch Events', () => {
    const wrapper = shallow(<Provider store={store}><Chat /></Provider>);
    console.log('WRAPPER',wrapper);
    expect(wrapper.state.text.should.equal(''));
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

xdescribe('Add Message', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      calendar: { events: { data: [{ title: 'My Event' }, { title: 'Your Event' }] } },
      auth: { user: { data: { couple_id: 1 } } },
      form: {},
      messages: [{
        message_id: 1,
        user_id: 1,
        couple_id: 1,
        content: 'test',
        created_at: '2016-06-30T15:33:49.040Z',
        updated_at: '2016-06-30T15:33:49.040Z',
        },
        {
        message_id: 2,
        user_id: 1,
        couple_id: 1,
        content: 'cool',
        created_at: '2016-06-30T15:33:50.752Z',
        updated_at: '2016-06-30T15:33:50.752Z',
        },],
      quiz: {},
      meter: {},
    });
  });

  it('should render one form', () => {
    const wrapper = shallow(<Provider store={store}><Chat /></Provider>);
    expect(wrapper.find('form')).to.exist;
  });

  it('should have props for opening and closing the dialog', () => {
    const wrapper = shallow(<Provider store={store}><Chat /></Provider>);
    expect(wrapper.props().handleDialogOpen).to.be.defined;
    expect(wrapper.props().handleDialogClose).to.be.defined;
  });

  it('should have props handleFormSubmit', () => {
    const wrapper = shallow(<Provider store={store}><Chat /></Provider>);
    expect(wrapper.props().handleFormSubmit).to.be.defined;
  });

  xit('should submit the form on click', () => {
    const onSubmit = sinon.spy();
    const wrapper = shallow(<Chat onSubmit={onSubmit} />);
    wrapper.find('button').simulate('click');
    expect(onSubmit.calledOnce).to.equal(true);
  });
});

xdescribe('Chat Card', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      calendar: { events: { data: [{ title: 'My Event' }, { title: 'Your Event' }] } },
      auth: { user: { data: { couple_id: 1 } } },
      form: {},
      messages: [{
        message_id: 1,
        user_id: 1,
        couple_id: 1,
        content: 'test',
        created_at: '2016-06-30T15:33:49.040Z',
        updated_at: '2016-06-30T15:33:49.040Z',
        },
        {
        message_id: 2,
        user_id: 1,
        couple_id: 1,
        content: 'cool',
        created_at: '2016-06-30T15:33:50.752Z',
        updated_at: '2016-06-30T15:33:50.752Z',
        },],
      quiz: {},
      meter: {},
    });
  });

  it('should contain a MessageList component in the card', () => {
    const wrapper = shallow(<Provider store={store}><ChatCard /></Provider>);
    expect(wrapper.find('MessageList')).to.exist;
  });

  it('should have props renderEvents', () => {
    const wrapper = shallow(<Provider store={store}><ChatCard /></Provider>);
    expect(wrapper.props().user).to.be.defined;
  });

  it('should call renderEvents', () => {
    const wrapper = shallow(<Provider store={store}><ChatCard /></Provider>);
    expect(wrapper.props().messages).to.be.called;
  });
});