/*
    Creates Questions table
*/

CREATE EXTENSION IF NOT EXISTS citext; 

CREATE TABLE Questions (
question_id serial PRIMARY KEY,
category_id integer,
content citext NOT NULL,
created_at timestamp NOT NULL DEFAULT now(),
updated_at timestamp NOT NULL DEFAULT now(),
);

-- CREATE FUNCTION update_updated_at_column() RETURNS trigger
--     LANGUAGE plpgsql
--     AS $$
--   BEGIN
--     NEW.updated_at = NOW();
--     RETURN NEW;
--   END;
-- $$;

-- CREATE TRIGGER questions_updated_at_modtime 
--   BEFORE UPDATE ON Questions 
--   FOR EACH ROW 
--   EXECUTE PROCEDURE update_updated_at_column();
