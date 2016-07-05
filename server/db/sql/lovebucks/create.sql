/*
    Creates table Lovebucks
*/

CREATE TABLE Lovebucks
(
    buck_id serial PRIMARY KEY,
    points int NOT NULL,
    memo text NOT NULL DEFAULT 'Because...',
    name text NOT NULL,
    user_id int NOT NULL,
    couple_id int NOT NULL,
    type int NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    FOREIGN KEY (couple_id) REFERENCES $(schema~).Couples(couple_id) ON DELETE CASCADE ON UPDATE CASCADE
);