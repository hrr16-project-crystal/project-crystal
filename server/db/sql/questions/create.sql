/*
    Creates table Users. Uses JSONB for holding object of answers array
*/

CREATE TABLE ${schema~}.Questions
(
    question_id serial PRIMARY KEY,
    question_text text NOT NULL,
    frequency text NOT NULL,
    answers jsonb
);