/* TODO
unit tests client - mocha, karma  **
unit tests server - mocha  **
integration tests - supertest  **
code coverage - coveralls **
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
});
