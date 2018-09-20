var Player = require("./player");
var Board = require("./board");

module.exports = function Game() {
  const players = [];
  const board = new Board();

  let currentPlayerIndex = 0;

  this.didPlayerWin = function() {
    return !(getCurrentPlayer().purse == 6);
  };

  const currentCategory = function() {
    return board.getCategory(getCurrentPlayer().place);
  };

  const getCurrentPlayerName = function() {
    return getCurrentPlayer().name
  }

  const getCurrentPlayer = function() {
    return players[currentPlayerIndex]
  }

  this.add = function(playerName) {
    const player = new Player(playerName);
    const playersCount = players.push(player);

    console.log(playerName + " was added");
    console.log("They are player number " + playersCount);

    return true;
  };

  const askQuestion = function() {
    const question = board.getQuestion(getCurrentPlayer().place);
    console.log(question);
  };

  const canLeavePenaltyBox = function(roll) {
    return roll % 2 != 0
  };

  const proceedWithCurrentPlayer = function(roll) {
    getCurrentPlayer().movePlayer(roll)
    console.log(
      getCurrentPlayerName() + "'s new location is " + getCurrentPlayer().place
    );
    console.log("The category is " + currentCategory());
    askQuestion();
  };

  this.rotatePlayer = function() {
    currentPlayerIndex += 1;
    if (currentPlayerIndex == players.length) currentPlayerIndex = 0;
  };

  this.roll = function(roll) {
    console.log(getCurrentPlayerName() + " is the current player");
    console.log("They have rolled a " + roll);

    if (getCurrentPlayer().isInPenaltyBox) {
      if (canLeavePenaltyBox(roll)) {
        getCurrentPlayer().canProceed = true;

        console.log(
          getCurrentPlayerName() + " is getting out of the penalty box"
        );

        proceedWithCurrentPlayer(roll);
      } else {
        console.log(
          getCurrentPlayerName() + " is not getting out of the penalty box"
        );
        getCurrentPlayer().canProceed = false;
      }
    } else {
      proceedWithCurrentPlayer(roll);
    }
  };

  this.wasCorrectlyAnswered = function() {
    if (getCurrentPlayer().canProceed == false) {
      return
    }
    console.log("Answer was correct!!!!");

    getCurrentPlayer().incrementPurse();
    console.log(
      getCurrentPlayerName() +
      " now has " +
      getCurrentPlayer().purse +
      " Gold Coins."
    );
  };

  this.wasIncorrectlyAnswered = function() {
    console.log("Question was incorrectly answered");
    console.log(getCurrentPlayerName() + " was sent to the penalty box");
    getCurrentPlayer().isInPenaltyBox = true;
  };
};
