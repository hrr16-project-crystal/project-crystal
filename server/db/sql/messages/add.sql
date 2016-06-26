
-- Adds message to the database

INSERT INTO Messages (content, user_id, couple_id)
VALUES (${content}, ${user_id}, ${couple_id})
RETURNING *