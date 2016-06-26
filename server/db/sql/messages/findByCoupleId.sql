
-- Returns all of couples chat history

SELECT  * FROM Messages
WHERE couple_id = $1