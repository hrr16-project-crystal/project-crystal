
-- Adds lovebuck transaction to the database

INSERT INTO Lovebucks (points, memo, name, user_id, couple_id, type)
VALUES (${points}, ${memo}, ${name}, ${user_id}, ${couple_id}, ${type})
RETURNING *