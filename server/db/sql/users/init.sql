/*
    Inserting a few demo users into the database, and returning their id-s;
*/

INSERT INTO ${schema~}.Users(first_name, last_name, email, password) VALUES
('Roger', 'Sejas', 'rsejas@gmail.com', 'r123'), -- user 1;
('Michelle', 'Tu', 'mtu@gmail.com', 'm123'), -- user 2;
('Nicholas', 'Randall', 'nrandall@gmail.com', 'n123'), -- user 3;
('Mrs', 'Randall', 'mrandall@gmail.com', 'm123'), -- user 4;
('John', 'Smith', 'jsmith@gmail.com', 'j123'), -- user 5;
('Mary', 'Smith', 'msmith@gmail.com', 'm123') -- user 6;
RETURNING user_id, first_name, last_name, email, password
