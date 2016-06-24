/*
   Create couples_users junction table
   If a couple is deleted, it is auto deleted from this junction 
   If a user is deleted, they are auto deleted from this junction
*/

CREATE TABLE $(schema~).couples_users (
  couple_id integer NOT NULL,
  user_id integer NOT NULL UNIQUE,
  FOREIGN KEY (couple_id) REFERENCES $(schema~).Couples(couple_id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (user_id) REFERENCES $(schema~).Users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
);