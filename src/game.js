var Player = require("./player");
var Board = require("./board");

module.exports = function Game() {
  const players = [];
  const board = new Board();

  let currentPlayerIndex = 0;

  this.didPlayerWin = function() {
    return !(getCurrentPlayer().purse == 6);
  };

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

  const canLeavePenaltyBox = function(roll) {
    return roll % 2 != 0
  };

  const proceedWithCurrentPlayer = function(player, roll) {
    player.movePlayer(roll);
    console.log(player.name + "'s new location is " + player.place);

    const currentCategory = board.getCategory(player.place);
    console.log("The category is " + currentCategory);

    const question = board.getQuestion(player.place);
    console.log(question);
  };

  this.rotatePlayer = function() {
    currentPlayerIndex += 1;
    if (currentPlayerIndex == players.length) currentPlayerIndex = 0;
  };

  this.roll = function(roll) {
    const currentPlayer = getCurrentPlayer();

    console.log(currentPlayer.name + " is the current player");
    console.log("They have rolled a " + roll);

    if (currentPlayer.isInPenaltyBox == false) {
      proceedWithCurrentPlayer(currentPlayer, roll);
      return
    }

    if (canLeavePenaltyBox(roll)) {
      currentPlayer.canProceed = true;
      console.log(currentPlayer.name + " is getting out of the penalty box");
      proceedWithCurrentPlayer(currentPlayer, roll);
    } else {
      currentPlayer.canProceed = false;
      console.log(currentPlayer.name + " is not getting out of the penalty box");
    }
  };

  this.wasCorrectlyAnswered = function() {
    const currentPlayer = getCurrentPlayer();
    if (currentPlayer.canProceed == false) {
      return
    }

    currentPlayer.incrementPurse();
    const name = currentPlayer.name;
    const coins = currentPlayer.purse;
    console.log("Answer was correct!!!!");
    console.log(`${name} now has ${coins} Gold Coins.`);
  };

  this.wasIncorrectlyAnswered = function() {
    const currentPlayer = getCurrentPlayer();
    currentPlayer.isInPenaltyBox = true;
    console.log("Question was incorrectly answered");
    console.log(currentPlayer.name + " was sent to the penalty box");
  };
};
