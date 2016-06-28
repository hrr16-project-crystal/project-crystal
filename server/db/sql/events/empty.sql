/*
    Quickly deletes all records from table Events
    and all dependent records from table Products.
*/
TRUNCATE TABLE ${schema~}.Events CASCADE;