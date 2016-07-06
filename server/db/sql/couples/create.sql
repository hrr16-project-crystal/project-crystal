/*
    Create Couples table
*/

CREATE TABLE Couples
(
    couple_id serial PRIMARY KEY,
    score real NOT NULL DEFAULT 0,
    respect_score integer NOT NULL DEFAULT 0,
    communication_score integer NOT NULL DEFAULT 0,
    intimacy_score integer NOT NULL DEFAULT 0,
    generosity_score integer NOT NULL DEFAULT 0,
    spontaneity_score integer NOT NULL DEFAULT 0,
    have_both_users_joined boolean NOT NULL DEFAULT false
);
