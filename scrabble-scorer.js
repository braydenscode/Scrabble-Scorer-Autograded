// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!\n");
   let userWord = input.question('Enter a word to score: ');
   return userWord;
}; 

let newPointStructure = transform(oldPointStructure);

let simpleScorer = function(word) {
   let points = word.length;
   return points;
};

let vowelBonusScorer = function(word) {
   let vowels = ['a', 'e', 'i', 'o', 'u'];
   let points = 0;
   for (let i = 0; i < word.length;i++) {
      if (vowels.includes(word[i])) {
         points += 3;
      }  
      else {
         points += 1;
      }
   }
   return points;
}
;

let scrabbleScorer = function (word) {
   word = word.toLowerCase()
   let points = 0;
 
	for (let i = 0; i < word.length; i++) {
		
      if (word[i] in newPointStructure) {
         points += newPointStructure[word[i]];
	  }
	}
	return points;
};

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
   }, 
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt(word) {
   console.log('Which scoring algorithm would you like to use?\n');
   for (i = 0; i < scoringAlgorithms.length; i++) {
      console.log(`${i} - ${scoringAlgorithms[i].name, scoringAlgorithms[i].description}`);
   }
   let result;
   let answer = input.question('Enter 0, 1, or 2: ');
   answer = parseInt(answer);
   if (answer >= 0 && answer <= 2) {
   result = scoringAlgorithms[answer].scorerFunction(word);
   return console.log(`\nScore for '${word}':\n${result}`);
   } else {
      console.log('Invalid input. Must be 0-2\n\n');
      scorerPrompt(word);
   }
}

function transform(object) {
   let newObject = {};
   
   for (let score in object) {
      let array = object[score];

         for (let element of array) {
            newObject[element.toLowerCase()] = Number(score);
         }
  }
  return newObject;
}

function runProgram() {
   let userWord = initialPrompt();
   scorerPrompt(userWord);

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
