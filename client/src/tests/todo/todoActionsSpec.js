import { expect } from '../testHelper';
import { getTodos, postTodo, deleteTodo } from '../../components/ToDo/todoAction';
import { FETCH_TODOS, ADDED_TODO, DELETED_TODO } from '../../helpers/constants/types';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';
const apiUrl = '/api/v1';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Todo Actions -- Async', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should fetch all todos', done => {
    nock(apiUrl)
      .get('/todos/1')
      .reply(200, { fetchTodos: [
        { content: 'todo1' }, { content: 'todo2' }, { content: 'todo3' },
      ] });

    const expectedActions = [
      { type: FETCH_TODOS, payload: { fetchTodos: [
        { content: 'todo1' }, { content: 'todo2' }, { content: 'todo3' },
      ] } },
    ];

    const store = mockStore({ fetchTodos: [] });
    store.dispatch(getTodos(1));
    setTimeout(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    }, 100);
  });

  it('creates a new todo for the couple', done => {
    nock(apiUrl)
    .post('/todos/addTodo', {
      content: 'New Todo',
      coupleID: 1,
    })
    .reply(200, {
      content: 'New Todo',
      coupleID: 1,
    });

    const expectedActions = [
      { type: ADDED_TODO, payload: {
        content: 'New Todo',
        coupleID: 1,
      } },
    ];
    const store = mockStore({ todo: {} });
    store.dispatch(postTodo({
      content: 'New Todo',
      coupleID: 1,
    }));
    setTimeout(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    }, 100);
  });

  it('should delete a single todo', done => {
    nock(apiUrl)
    .delete('/todos/deleteTodo/1')
    .reply(200, {
      todo_id: 1,
      content: 'New Todo',
      couple_id: 1,
    });

    const expectedActions = [
      { type: DELETED_TODO, payload: {
        todo_id: 1,
        content: 'New Todo',
        couple_id: 1,
      } },
    ];

    const store = mockStore({ todo: {} });
    store.dispatch(deleteTodo(1));
    setTimeout(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    }, 100);
  });
});
