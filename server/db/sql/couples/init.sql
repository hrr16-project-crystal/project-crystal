/*
    Inserting a few demo couples into the database, and returning their id-s;
*/

INSERT INTO ${schema~}.Couples(score) VALUES
(78), -- couple 1;
(99), -- couple 2;
(23) -- couple 3;
RETURNING *
