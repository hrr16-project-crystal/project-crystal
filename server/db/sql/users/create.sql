/*
    Create Users table
    RF: password and other character checks e.g. password text NOT NULL CHECK (CHECK(char_length(password)>8)),
*/

CREATE TABLE Users
(
    user_id serial PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL UNIQUE, 
    password text NOT NULL,
    couple_id integer NOT NULL,
    FOREIGN KEY (couple_id) REFERENCES Couples(couple_id) ON DELETE CASCADE ON UPDATE CASCADE
);