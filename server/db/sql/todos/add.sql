/*
    Inserts a new todo record.
    Expects (todo_id: number generated on client side, content: string of the todo couple_id: )
*/
INSERT INTO ${schema~}.Todos(content, couple_id)
VALUES(${content}, ${couple_id})
RETURNING *