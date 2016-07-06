import { expect } from '../testHelper';
import { getHealth } from '../../components/Meter/meterAction';
import { FETCH_HEALTH } from '../../helpers/constants/types';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';
const apiUrl = 'http://localhost:3000/api/v1';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
