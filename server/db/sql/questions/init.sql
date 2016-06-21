INSERT INTO ${schema~}.Users(question, group, answers) VALUES

('Have you done something nice for your partner recently?', 'daily',
'{ answers: [ "Yes", "No" ]}'),

('Could you describe the way your partner smells?', 'daily',
'{ answers: [ "Yes", "No" ]}'),

('Have you hugged your partner in the last day?', 'daily',
'{ answers: [ "Yes", "No" ]}'),

('Did you and your partner laugh together recently?', 'daily',
'{ answers: [ "Yes", "No" ]}'),

('Have you gone on a date in the last week?', 'daily',
'{ answers: [ "Yes", "No" ]}'),


('What do your friends and family think of your partner?', 'initial',
'{ answers: [
"They think the two of you are soulmates",
"They think s/he is good for you",
"They are indifferent",
"They have warned you about your partner and/or don\'t approve" 
]}'),

('What sort of arrangement do the two of you have regarding your finances?', 'initial',
 '{ answers: [
"We have joint accounts",
"We have discussed finances and have a plan in place",
"Our finances are completely separate",
"We have never talked about money",
]}'),

('Where does this relationship fall with regards to past relationships for you?', 'initial', 
  '{ answers: [
"Best I\'ve ever had",
"Its good",
"A little bit of everything or mid range",
"Not the best relationship I\'ve had"
]}'),

('Can you picture your life without your partner?', 'initial',
'{ answers: [
"Can\'t do it",
"Never thought about it, but now that you mention it? I can\'t",
"Maybe or Probably",
"I\'ll be fine either way"
]}'),

('Do you celebrate your anniversaries or special moments?', 'intitialize',
'{ answers: [
"Every single one",
"A lot of them",
"Not our thing",
"We don\'t have any or No"
]}'),

('How often do you or your partner flirt with other people?', 'initial',
'{ answers: [
"Never",
"Rarely",
"Once in a while",
"Often"
]}'),

('Its one of your birthdays. How do you spend it?', 'initial',
'{ answers: [
"Something intimate, just the two of us",
"With friends and each other",
"With friends only",
"No plans"
]}'),

('How often do the two of you get away together, either on a small outing or a holiday?', 'initial',
'{ answers: [
"Regularly",
"Here and there",
"Just once so far",
"We don\'t at all"
]}'),

('What do you find the most attractive about your partner?', 'initial',
'{ answers: [
"How they present and their personality",
"Their personality",
"How they present",
"Can\'t put it into words"
]}'),

('When on a long trip together, what happens between the two of you?', 'initial',
'{ answers: [
"We get along famously",
"We do our own thing",
"We might have a fight",
"We can\'t go on a trip without fighting"
]}'),

('Have you ever caught your partner in a lie?', 'initial',
'{ answers: [
"Never",
"Once, but it was minor or a misunderstanding",
"A few times",
"It feels like lying is a constant issue in our relationship"
]}'),

('Are either of you still in touch with any of your ex\'s?', 'initial',
'{ answers: [
"Neither of us are",
"One or two are close friends",
"A handful of them",
"Almost all of them"
]}'),

('Have you ever kept a secret from your partner?', 'initial',
'{ answers: [
"Nope",
"Once",
"A few times",
"All kinds of secrets are being kept"
]}'),

('How do the two of you feel about having children?', 'initial',
'{ answers: [
"We agree completely on the matter",
"One of us wants kids and the other doesn\'t",
"We\'ve talked about it but haven\'t decided on anything yet",
"We don\'t agree when it comes to having children"
]}'),

('Do the two of you see eye to eye when it comes to religion?', 'initial',
'{ answers: [
"We are of the same faith",
"Similar viewpoints",
"We come from very different backgrounds but are open to each others beliefs",
"We fight or don\'t agree about religion"
]}'),

('How much time do the two of you spend together?', 'initial',
'{ answers: [
"We spend a fair amount but not all of our time together",
"We have some shared interests that we do together",
"It depends on the week - sometimes we are inseperable and other times we aren\'t",
"We spend very little time together"
]}'),

('When you fight, who apologizes?', 'initial',
'{ answers: [
"Usually the person in the wrong",
"Its almost like we take turns apologizing",
"One of us apologizes more than the other",
"Neither of us"
]}'),

RETURNING question, group, answers