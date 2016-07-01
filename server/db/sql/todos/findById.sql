/*
    Selects a particular todo record by todo id.
*/

SELECT * FROM ${schema~}.Todos 
WHERE couple_id = $1