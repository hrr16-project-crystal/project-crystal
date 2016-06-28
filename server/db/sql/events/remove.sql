/*
    Remove couples record from Questions.
*/

DELETE from ${schema~}.Events WHERE event_id = $1
RETURNING *