/*
    Inserts a new event record.
*/
INSERT INTO ${schema~}.Events(title, description, start_date, end_date, category, couple_id)
VALUES(${title}, ${description}, ${start_date}, ${end_date}, ${category}, ${couple_id})
-- RETURNING id   // CHANGED
RETURNING *