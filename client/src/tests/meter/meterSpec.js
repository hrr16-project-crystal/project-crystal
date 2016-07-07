/* TODO
unit tests client - mocha, karma  **
unit tests server - mocha  **
integration tests - supertest  **
code coverage - coveralls/istanbul **
end to end tests - casper - maybe
visual tests - phantomcss - maybe
continuous integration - travis-ci  **
*/

import { expect } from '../testHelper';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import Meter from '../../components/Meter/Meter';
import { Chart } from 'react-google-charts';

import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Meter', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      auth: { 
        user: { 
          data: { 
            couple_id: 1 
          } 
        } 
      },
      meter: {
        health: {
          data: {
            score: 7,
            respect_score: 1,
            communication_score: 1,
            intimacy_score: 2,
            generosity_score: 5,
            spontaneity_score: 6,
          }
        }
      },
      calendar: {},
      form: {},
      messages: {},
      quiz: {},
    });
  });

  // it('should render a TodoAdd component', () => {
  //   const wrapper = mount(<Provider store={store}>
  //     <TodoList /></Provider>);
  //   expect(wrapper.find(TodoAdd)).to.have.length(0);
  // });
  
  
});
