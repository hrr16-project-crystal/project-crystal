CREATE TABLE ${schema~}.Questions
(
    question_id serial PRIMARY KEY,
    question_text text NOT NULL,
    group text NOT NULL,
    answers jsonb
);