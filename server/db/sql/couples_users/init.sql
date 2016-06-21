/*
   Insert a few demo couples and users into the junction table
*/

INSERT INTO ${schema~}.couples_users(couple_id, user_id) VALUES
(1, 1), -- couple 1;
(1, 2), -- couple 1;
(2, 3), -- couple 2;
(2, 4), -- couple 2;
(3, 5), -- couple 3;
(3, 6) -- couple 3;
RETURNING *