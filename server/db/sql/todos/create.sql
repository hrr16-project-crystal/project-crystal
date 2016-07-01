/*
    Creates table Todos
*/

CREATE TABLE ${schema~}.Todos
(
    todo_id serial PRIMARY KEY,
    couple_id integer NOT NULL,
    user_id integer NOT NULL,
    content text NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    FOREIGN KEY (couple_id) REFERENCES $(schema~).Couples(couple_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (user_id) REFERENCES $(schema~).Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);