/*
    Remove Couple record by couple ID
    Returns whole Couple record
    MAYBE NOT - .... make explicit 
    NOTE: Users Table is FK linked with ON DELETE CASCADE restraint, so a Couple deletion
    WILL remove all linked Users. Invoke only when both coupels joined = false, but this will
    be up to YOU to check! This is a dangerous but useful method for cleaning up all oouple related records
  
    // when new features implemented, add them to the join here so that a couple record deletion
    returns all Couple and couple related records! 
*/

DELETE from ${schema~}.Couples 
WHERE couple_id = $1
RETURNING *