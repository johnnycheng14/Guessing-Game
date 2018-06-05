function generateWinningNumber(){
    return Math.floor(Math.random() * 100) + 1;
}

function shuffle(array) {
    var remainder = array.length;
    var lastIndex;
    var randomIndex;
  
    while (remainder) {
      randomIndex = Math.floor(Math.random() * remainder--);
      //swaps end of unshuffled stack with random element of remaining unshuffled stack
      lastIndex = array[remainder]; 
      array[remainder] = array[randomIndex];
      array[randomIndex] = lastIndex;
    }
  
    return array;
}

function Game(){
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
}

Game.prototype.difference = function(){
    return Math.abs(this.winningNumber - this.playersGuess)
}
Game.prototype.isLower = function(){
    return this.playersGuess < this.winningNumber;
}
Game.prototype.playersGuessSubmission = function(num){
    if(num < 1 || num > 100 || typeof num != "number")
        throw "That is an invalid guess.";
    this.playersGuess = num;
    return this.checkGuess();
}
Game.prototype.checkGuess = function(){
    if(this.winningNumber === this.playersGuess)
        return "You Win!";
    if(this.pastGuesses.includes(this.playersGuess))
        return "You have already guessed that number."
    this.pastGuesses.push(this.playersGuess);
    if(this.pastGuesses.length === 5)
        return "You Lose.";
    if(this.difference() < 10)
        return "You're burning up!";
    if(this.difference() < 25)
        return "You're lukewarm.";
    if(this.difference() < 50)
        return "You're a bit chilly.";
    return "You're ice cold!"
}
Game.prototype.provideHint = function(){
    return shuffle([this.winningNumber, generateWinningNumber(), generateWinningNumber()]);
}

function newGame(){
    return new Game();
}

function makeAGuess(game) {
    var guess = $('#players-input').val();
    $('#players-input').val("");
    var output = game.playersGuessSubmission(parseInt(guess,10));
    $('#title').text(output);
}

$(document).ready(function() {
    var game = new Game();
    
    $('#submit').click(function(e) {
       makeAGuess(game);
    })

    $('#players-input').keypress(function(event) {
        if ( event.which == 13 ) {
           makeAGuess(game);
        }
    })

    $('#hint').click(function() {
        var hints = game.provideHint();
        $('#title').text('The winning number is '+hints[0]+', '+hints[1]+', or '+hints[2]);
    });

    $('#reset').click(function() {
        game = newGame();
        $('#title').text('Play the Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100!')
        $('.guess').text('-');
        $('#hint, #submit').prop("disabled",false);

    })
})