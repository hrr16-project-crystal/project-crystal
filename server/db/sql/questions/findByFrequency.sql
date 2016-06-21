/*
    Selects a particular question record by question frequency.
*/

SELECT * FROM ${schema~}.Questions 
WHERE frequency = $1
