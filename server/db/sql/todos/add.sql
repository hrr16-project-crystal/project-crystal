/*
    Inserts a new todo record.
    Expects (todo_id: number generated on client side, content: string of the todo couple_id: )
*/
INSERT INTO ${schema~}.Todos(todo_id, content, couple_id)
VALUES(${todo_id}, ${content}, ${couple_id})
RETURNING *