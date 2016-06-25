/*
    Remove Couple record by couple ID
    Returns whole Couple record (but not any associated records)
    NOTE: Dangerous because tables linked by Foreign Key to Couples Primary Key may be deleted 
    if CASCADE constraint set. It is up to engineer to ensure controller logic performs checks to verify
    that it is okay to proceed with Couple record deletion. 
*/

DELETE from ${schema~}.Couples 
WHERE couple_id = $1
RETURNING *