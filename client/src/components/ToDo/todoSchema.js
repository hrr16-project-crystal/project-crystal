import { Schema, arrayOf } from 'normalizr';

export const todo = new Schema('todos', { idAttribute: 'todo_id' } );
export const arrayOfTodos = arrayOf(todo);