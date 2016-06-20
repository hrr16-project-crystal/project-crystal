UPDATE ${schema~}.Users 
SET first_name=${first_name}, last_name=${last_name}, email=${email}, password=${password}
WHERE user_id=${user_id}
RETURNING *
