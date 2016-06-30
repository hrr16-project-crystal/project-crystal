/*
    Remove couples record from Events.
*/

DELETE from ${schema~}.Events WHERE event_id = $1
RETURNING *