/*
    Deletes Couple record by user ID
    Returns deleted Couple record with user record obtained from user id 
    It must do this, because couple record deletion will cascade through to users

    NOTE: Does not account for have_both_users_joined flag or linked User records.
    This must be accounted for by the engineer in the DB Controller logic. 
*/

WITH found_user AS (
  SELECT * FROM Users
  WHERE Users.user_id = $1
),
deleted_couple_record AS (
  DELETE FROM Couples USING found_user
  WHERE Couples.couple_id = found_user.couple_id
  RETURNING score, respect_score, intimacy_score, communication_score, generosity_score, spontaneity_score, have_both_users_joined
)
SELECT * FROM found_user, deleted_couple_record