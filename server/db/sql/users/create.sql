/*
    Creates table Users.
*/
CREATE EXTENSION IF NOT EXISTS citext; 

CREATE TABLE Users
(
    user_id serial PRIMARY KEY,
    first_name citext NOT NULL,
    last_name citext NOT NULL,
    email citext NOT NULL UNIQUE, 
    password text NOT NULL,
    couple_id integer NOT NULL,
    FOREIGN KEY (couple_id) REFERENCES Couples(couple_id) ON DELETE CASCADE ON UPDATE CASCADE
);

   -- password text NOT NULL CHECK (CHECK(char_length(password)>8)),