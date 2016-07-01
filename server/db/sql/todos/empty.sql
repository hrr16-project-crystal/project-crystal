/*
    Quickly deletes all records from table Todos
    and all dependent records from table Products.
*/
TRUNCATE TABLE ${schema~}.Todos CASCADE;