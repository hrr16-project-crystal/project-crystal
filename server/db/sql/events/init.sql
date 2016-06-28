/*
    Populates table Events.
    
    Inserts Events into the table.

*/

INSERT INTO ${schema~}.Events(title, description, start_date, end_date, category, couple_id) VALUES

('Conference', 'Big conference for important people', '2016-06-29T12:00:00.000Z', 
  '2016-06-29T19:00:00.000Z', 'Activity', 1),

('Conference 2', 'Another big conference for more important people', '2016-06-28T14:00:00.000Z',
'2016-06-28T18:00:00.000Z', 'Dinner', 1),

('Conference 3', 'Big bad developer event', '2016-06-24T11:00:00.000Z',
'2016-06-24T15:00:00.000Z', 'Family', 1)
