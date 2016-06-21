/*
    Creates Database
-- */
-- CREATE DATABASE blossomly
-- OWNER 'some user?'

/*
    Creates table Users.
*/

CREATE TABLE ${schema~}.Users
(
    user_id serial PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL UNIQUE, 
    password text NOT NULL
);

   -- password text NOT NULL CHECK (CHECK(char_length(password)>8)),