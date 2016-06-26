-- Creates message table for couple chat

CREATE TABLE Messages
(
    message_id serial PRIMARY KEY,
    user_id int NOT NULL,
    couple_id int NOT NULL,
    content text NOT NULL,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp NOT NULL DEFAULT now(),
    FOREIGN KEY (couple_id) REFERENCES $(schema~).Couples(couple_id) ON DELETE CASCADE ON UPDATE CASCADE
);