/*
    Inserts a new question record.
    Expects (question: str of question text, frequency: str of which set the question belongs to(initial, daily, ...), answers: '{ answers: [ "choiceFoo", "choiceBar", ... ]}')
*/
INSERT INTO ${schema~}.Question(question, frequency, answers)
VALUES(${question}, ${frequency}, ${answers})
-- RETURNING id   // CHANGED
RETURNING *