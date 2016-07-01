/*
    Store one total score for each day.
*/

CREATE TABLE DailyScores
(
    couple_id serial PRIMARY KEY,
    monthly_scores integer ARRAY[31] NOT NULL DEFAULT 0,
    have_both_users_joined boolean NOT NULL DEFAULT false
    FOREIGN KEY (user_id) REFERENCES ${schema~}.Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
