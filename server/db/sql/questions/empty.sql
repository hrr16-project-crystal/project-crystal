/*
    Quickly deletes all records from table Questions
    and all dependent records from table Products.
*/
TRUNCATE TABLE ${schema~}.Questions CASCADE;