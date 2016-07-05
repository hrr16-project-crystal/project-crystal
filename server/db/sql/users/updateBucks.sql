-- Change a users loveBucks balance

UPDATE Users
SET love_bucks = (love_bucks + $1)
where user_id = $2
RETURNING *