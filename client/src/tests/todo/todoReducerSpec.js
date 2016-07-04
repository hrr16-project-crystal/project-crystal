import { expect } from '../testHelper';
import { ADDED_TODO, FETCH_TODOS } from '../../helpers/constants/types';
import todoReducer from '../../components/Todo/todoReducer';

describe('Todo Reducer', () => {
  it('should return an object with a fetchTodos key value pair as the default state', () => {
    const newState = todoReducer(undefined, { type: 'unknown' });
    expect(newState).to.eql({ fetchTodos: [] });
  });

  it('should handle action of type FETCH_TODOS', () => {
    const action = { type: FETCH_TODOS, payload: 'all todos' };
    expect(todoReducer({}, action)).to.eql({ fetchTodos: 'all todos' });
  });

  it('should handle action of type ADDED_TODO', () => {
    const action = { type: ADDED_TODO, payload: 'new todo' };
    expect(todoReducer({ fetchTodos: [] }, action)).to.eql({ fetchTodos: ['new todo'] });
  });
});
