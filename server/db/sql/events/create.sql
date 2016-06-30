/*
    Creates table Events
*/

CREATE TABLE ${schema~}.Events
(
    event_id serial PRIMARY KEY,
    title text NOT NULL,
    description text,
    start_date text NOT NULL,
    end_date text NOT NULL,
    category text NOT NULL,
    couple_id int NOT NULL,
    FOREIGN KEY (couple_id) REFERENCES ${schema~}.Couples(couple_id) ON DELETE CASCADE ON UPDATE CASCADE
);