/*
    Creates table Couples.
*/

CREATE TABLE ${schema~}.Couples
(
    couple_id serial PRIMARY KEY,
    score integer NOT NULL DEFAULT 0,
    respect_score integer NOT NULL DEFAULT 0,
    communication_score integer NOT NULL DEFAULT 0,
    intimacy_score integer NOT NULL DEFAULT 0,
    generosity_score integer NOT NULL DEFAULT 0,
    spontaneity_score integer NOT NULL DEFAULT 0
);
