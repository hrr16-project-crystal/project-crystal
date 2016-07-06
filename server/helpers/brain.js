var brain = require('brain');
var nBrain = require('natural-brain');
var fs = require('fs');
var classifier = new nBrain();

// var neg = fs.readFileSync(`${__dirname}/neg.txt`, 'utf8');
// neg = neg.match(/[^\r\n]+/g);
// neg.forEach(word => {
//   classifier.addDocument(word, 'bad');
// });

// var positive = fs.readFileSync(`${__dirname}/positive.txt`, 'utf8');
// positive = positive.match(/[^\r\n]+/g);
// positive.forEach(word => {
//   classifier.addDocument(word, 'good');
// });

classifier.addDocument('I hate you', 'bad');
classifier.addDocument('You\'re an idiot', 'bad');
classifier.addDocument('Moron', 'bad');
classifier.addDocument('You can be a jerk', 'bad');
classifier.addDocument('I love you', 'good');
classifier.addDocument('I like pizza', 'good');
classifier.addDocument('You are nice', 'good');
classifier.addDocument('Cool', 'good');
classifier.addDocument('No', 'bad');
classifier.addDocument('Yes', 'good');
classifier.addDocument('Want to go out tonight', 'good');
classifier.addDocument('Good idea!', 'good');
classifier.addDocument('Love it!', 'good');
classifier.addDocument('Hate it', 'bad');
classifier.addDocument('I don\'t want to', 'bad');

classifier.train();

const testMessage = (message) => classifier.classify(message);

console.log('brain loaded');
module.exports = testMessage;

// brain tests 

// console.log(classifier.classify('I\'d love to!'));                // good
// console.log(classifier.classify('Super!'));                       // good
// console.log(classifier.classify('No, i dont want to'));           // bad
// console.log(classifier.classify('Want to go to a movie later?')); // good
// console.log(classifier.classify('I hate it'));                    // bad
// console.log(classifier.classify('Sometimes you\'re dumb'));       // bad
// console.log(classifier.classify('Idiot'));                        // bad
// console.log(classifier.classify('you jerk'));                     // bad
// console.log(classifier.classify('cool'));                         // good
// console.log(classifier.classify('Perfect'));                      // good
