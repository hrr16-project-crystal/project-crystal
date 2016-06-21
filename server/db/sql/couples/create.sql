/*
    Creates table Couples.
*/

CREATE TABLE ${schema~}.Couples
(
    couple_id serial PRIMARY KEY,
    score integer NOT NULL DEFAULT 0
);
