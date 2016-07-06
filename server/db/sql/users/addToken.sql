/*
    Inserts the access and refresh token.

*/

UPDATE Users
SET 
access_token = ${access_token},
refresh_token = ${refresh_token}
WHERE Users.user_id = ${user_id}
RETURNING *