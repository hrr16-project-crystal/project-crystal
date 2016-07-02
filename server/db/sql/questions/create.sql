/*
    Creates Questions table
    INSERT INTO ${schema~}.Questions(body, frequency, category, answers) VALUES

*/

CREATE TABLE Questions (
question_id serial PRIMARY KEY,
category text NOT NULL,
body text NOT NULL,
frequency text NOT NULL,
answers json
);

-- CREATE FUNCTION update_updated_at_column() RETURNS trigger AS $$
-- BEGIN
-- NEW.updated_at = NOW();
-- RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER questions_updated_at_trigger
-- BEFORE UPDATE ON Questions
-- FOR EACH ROW
-- EXECUTE PROCEDURE update_updated_at_column();
