/*
    Remove todo from todo table
*/

DELETE from ${schema~}.Todos WHERE todo_id = $1
RETURNING *;