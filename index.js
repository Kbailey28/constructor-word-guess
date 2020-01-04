var Word = require("./word.js");
var inquirer = require("inquirer");

var letterArray = "abcdefghijklmnopqrstuvwxyz";

var codingLanguages = ["html", "css", "javascript", "node", "sql", "python",
"react", "angular", "ruby", "java", "r"];

var randomIndex = Math.floor(Math.random() * codingLanguages.length);
var randomWord = codingLanguages[randomIndex];

var computerWord = new Word(randomWord);

var requireNewWord = false;
var incorrectLetters = [];
var correctLetters = [];

var guessesLeft = 12;

function theLogic() {
    if(requireNewWord) {
        var randomIndex = Math.floor(Math.random()* codingLanguages.length);
        var randomWord = codingLanguages[randomIndex];

        computerWord = new Word(randomWord);

        requireNewWord = false;
    }

    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    if (wordComplete.includes(false)) {
        inquirer.prompt([
        {
          type: "input",
          message: "Select letter from A to Z",
          name: "userinput"
        }
        ]).then(function(input){
            if(!letterArray.includes(input.userinput) || input.userinput > 1) {
                console.log("\nPlease try again\n");
                theLogic()
            }else {
                if(
                    incorrectLetters.includes(input.userinput) || correctLetters.includes(input.userinput) || 
                    input.userinput === ""
                ) {
                    console.log("\nAlready Guessed or No guess Submitted\n")
                    theLogic();
                } else {
                    var wordCheckArray = [];

                    computerWord.userGuess(input.userinput);

                    computerWord.objArray.forEach(wordCheck);
                    if(wordCheckArray.join("") === wordComplete.join("")) {
                        console.log("\nIncorrect\n")
                        incorrectLetters.push(input.userinput);
                        guessesLeft --;
                    }else {
                        console.log("\nCorrect!!\n");

                        correctLetters.push(input.userinput);
                    }
                    computerWord.log();

                    console.log("Guesses Left: " + guessesLeft + "\n");

                    console.log("Letters Guessed: " + incorrectLetters.join(" ") + "\n");
                    if(guessesLeft > 0) {
                        theLogic();
                    }else {
                        console.log("You Lost\n");
                    }
                    function wordCheck(key) {
                        wordCheckArray.push(key.guessed);
                    }
                } 
            }
        });
    }else {
        console.log("YOU ARE CORRECT!!\n");
    }
    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }

}
    function restartGame () {
        inquirer.prompt([
            {
                type:"list",
                message: "Would you like to:",
                choices: ["Play again", "Exit"],
                name: "restart"
            }
        ]).then(function(input){
            if(input.restart === "Play Again") {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 12;
                theLogic();
            } else {
                return;
            }
        });
    }
    theLogic();