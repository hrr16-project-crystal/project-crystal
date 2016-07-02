import { renderComponent, expect } from '../testHelper';
import CreateEvent from '../../components/Calendar/CreateEvent';
import configureMockStore from 'redux-mock-store';
import TestUtils from 'react-addons-test-utils';

describe('Create Event', () => {
  let component;
  beforeEach(() => {
    component = renderComponent(CreateEvent);
  });

  it('should have a button to submit the event!', () => {
    expect(component.find('.btn')).to.exist;
  });
});
