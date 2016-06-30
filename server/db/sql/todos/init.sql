/*
    Populates table Questions.
    
    Inserts Questions into the table.

*/

-- INSERT INTO ${schema~}.Questions(body, frequency, category, answers) VALUES

-- ('Have you done something nice for your partner recently?', 'daily', 'Generosity',
-- '{ "answers": [ "Yes", "No" ]}'),

-- ('Could you describe the way your partner smells?', 'daily', 'Intimacy',
-- '{ "answers": [ "Yes", "No" ]}'),

-- ('Have you hugged your partner in the last day?', 'daily', 'Intimacy',
-- '{ "answers": [ "Yes", "No" ]}'),

-- ('Did you and your partner laugh together recently?', 'daily', 'Spontaneity',
-- '{ "answers": [ "Yes", "No" ]}'),

-- ('Have you gone on a date in the last week?', 'daily', 'Spontaneity',
-- '{ "answers": [ "Yes", "No" ]}'),

-- ('What do your friends and family think of your partner?', 'initial', 'Respect',
-- '{ "answers": [
-- "They think the two of you are soulmates",
-- "They think s/he is good for you",
-- "They are indifferent",
-- "They have warned you about your partner and/or dont approve" 
-- ]}'),

-- ('What sort of arrangement do the two of you have regarding your finances?', 'initial', 'Communication',
--  '{ "answers": [
-- "We have joint accounts",
-- "We have discussed finances and have a plan in place",
-- "Our finances are completely separate",
-- "We have never talked about money"
-- ]}'),

-- ('Where does this relationship fall with regards to past relationships for you?', 'initial', 'Spontaneity',
--   '{ "answers": [
-- "Best Ive ever had",
-- "Its good",
-- "A little bit of everything or mid range",
-- "Not the best relationship Ive had"
-- ]}'),

-- ('Can you picture your life without your partner?', 'initial', 'Intimacy',
-- '{ "answers": [
-- "Cant do it",
-- "Never thought about it, but now that you mention it? I cant",
-- "Maybe or Probably",
-- "Ill be fine either way"
-- ]}'),

-- ('Do you celebrate your anniversaries or special moments?', 'initial', 'Generosity',
-- '{ "answers": [
-- "Every single one",
-- "A lot of them",
-- "Not our thing",
-- "We dont have any or No"
-- ]}'),

-- ('How often do you or your partner flirt with other people?', 'initial', 'Respect',
-- '{ "answers": [
-- "Never",
-- "Rarely",
-- "Once in a while",
-- "Often"
-- ]}'),

-- ('Its one of your birthdays. How do you spend it?', 'initial', 'Spontaneity',
-- '{ "answers": [
-- "Something intimate, just the two of us",
-- "With friends and each other",
-- "With friends only",
-- "No plans"
-- ]}'),

-- ('How often do the two of you get away together, either on a small outing or a holiday?', 'initial', 'Spontaneity',
-- '{ "answers": [
-- "Regularly",
-- "Here and there",
-- "Just once so far",
-- "We dont at all"
-- ]}'),

-- ('What do you find the most attractive about your partner?', 'initial', 'Respect',
-- '{ "answers": [
-- "Their looks and their personality",
-- "Their personality",
-- "Their looks",
-- "Cant put it into words"
-- ]}'),

-- ('When on a long trip together, what happens between the two of you?', 'initial', 'Respect',
-- '{ "answers": [
-- "We get along famously",
-- "We do our own thing",
-- "We might have a fight",
-- "We cant go on a trip without fighting"
-- ]}'),

-- ('Have you ever caught your partner in a lie?', 'initial', 'Communication',
-- '{ "answers": [
-- "Never",
-- "Once, but it was minor or a misunderstanding",
-- "A few times",
-- "It feels like lying is a constant issue in our relationship"
-- ]}'),

-- ('Are either of you still in touch with any of your exes?', 'initial', 'Respect',
-- '{ "answers": [
-- "Neither of us are",
-- "One or two are close friends",
-- "A handful of them",
-- "Almost all of them"
-- ]}'),

-- ('Have you ever kept a secret from your partner?', 'initial', 'Respect',
-- '{ "answers": [
-- "Nope",
-- "Once",
-- "A few times",
-- "All kinds of secrets are being kept"
-- ]}'),

-- ('How do the two of you feel about having children?', 'initial', 'Communication',
-- '{ "answers": [
-- "We agree completely on the matter",
-- "One of us wants kids and the other doesnt",
-- "Weve talked about it but havent decided on anything yet",
-- "We dont agree when it comes to having children"
-- ]}'),

-- ('Do the two of you see eye to eye when it comes to religion?', 'initial', 'Communication',
-- '{ "answers": [
-- "We are of the same faith",
-- "Similar viewpoints",
-- "We come from very different backgrounds but are open to each others beliefs",
-- "We fight or dont agree about religion"
-- ]}'),

-- ('How much time do the two of you spend together?', 'initial', 'Intimacy',
-- '{ "answers": [
-- "We spend a fair amount but not all of our time together",
-- "We have some shared interests that we do together",
-- "It depends on the week - sometimes we are inseperable and other times we arent",
-- "We spend very little time together"
-- ]}'),

-- ('When you fight, who apologizes?', 'initial', 'Respect',
-- '{ "answers": [
-- "Usually the person in the wrong",
-- "Its almost like we take turns apologizing",
-- "One of us apologizes more than the other",
-- "Neither of us"
-- ]}'),

-- -- on front end, if "answers" === string for a question, collect the answer as a string
-- -- these questions will be to show the partner once both people have filled out the quiz
-- -- ???maybe have the partner upvote/downvote responses to use for a metric in our relationship health meter??? 
-- ('When was the first time you became aware of me?', 'quiz1', 'Communication',
-- '{ "answers": [
-- "string" 
-- ]}'),

-- ('Do you remember the first thing you and your partner said to one another?', 'quiz1', 'Initmacy',
-- '{ "answers": [
-- "string" 
-- ]}'),

-- ('What was your first impression of your partner?', 'quiz1', 'Respect',
-- '{ "answers": [
-- "string" 
-- ]}'),

-- (' Did you ever dislike your partner?', 'quiz1', 'Respect',
-- '{ "answers": [
-- "string" 
-- ]}'),

-- ('What’s your favorite memory of your partner?', 'quiz1', 'Intimacy',
-- '{ "answers": [
-- "string" 
-- ]}'),

-- ('What do you like best about your partner?', 'quiz1', 'Generosity',
-- '{ "answers": [
-- "string" 
-- ]}'),

-- ('What is your favorite way of spending time with your partner?', 'quiz1', 'Spontaneity',
-- '{ "answers": [
-- "string" 
-- ]}')
