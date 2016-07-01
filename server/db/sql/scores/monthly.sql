/*
    Store average monthly total score for the past six months.

    Do we just put this array on the user?
*/

CREATE TABLE MonthlyScores
(
    couple_id serial PRIMARY KEY,
    monthly_scores integer ARRAY[6] NOT NULL DEFAULT 0,
    have_both_users_joined boolean NOT NULL DEFAULT false
    FOREIGN KEY (user_id) REFERENCES ${schema~}.Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);
