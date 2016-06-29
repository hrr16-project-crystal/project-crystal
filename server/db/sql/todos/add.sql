/*
    Inserts a new todo record.
    Expects (todo_id: number generated on client side, content: string of the todo )
*/
INSERT INTO ${schema~}.Todos(todo_id, content)
VALUES(${todo_id}, ${content})
RETURNING *