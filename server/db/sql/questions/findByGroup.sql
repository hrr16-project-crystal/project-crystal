/*
    Selects a particular question record by question id.
*/

SELECT * FROM ${schema~}.Questions 
WHERE group = $1
