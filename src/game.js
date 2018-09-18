const Player = require("./player");

module.exports = function Game() {
  const players = [];
  const places = [];
  const purses = [];
  const inPenaltyBox = [];

  const popQuestions = [];
  const scienceQuestions = [];
  const sportsQuestions = [];
  const rockQuestions = [];

  let currentPlayer = 0;
  let isGettingOutOfPenaltyBox = false;

  this.didPlayerWin = function() {
    return !(purses[currentPlayer] == 6);
  };

  const currentCategory = function() {
    const currentPlace = places[currentPlayer]
    switch (currentPlace%4) {
      case 0:
        return "Pop";
      case 1:
        return "Science";
      case 2:
        return "Sports";
      case 3:
        return "Rock";
    }
  };

  for (var i = 0; i < 50; i++) {
    popQuestions.push("Pop Question " + i);
    scienceQuestions.push("Science Question " + i);
    sportsQuestions.push("Sports Question " + i);
    rockQuestions.push("Rock Question " + i);
  }

  const getCurrentPlayerName = function() {
    return players[currentPlayer]
  }

  this.add = function(playerName) {
    const playersCount = players.push(playerName);
    places[playersCount - 1] = 0;
    purses[playersCount - 1] = 0;
    inPenaltyBox[playersCount - 1] = false;

    console.log(playerName + " was added");
    console.log("They are player number " + playersCount);

    return true;
  };

  const askQuestion = function() {
    if (currentCategory() == "Pop") console.log(popQuestions.shift());
    if (currentCategory() == "Science") console.log(scienceQuestions.shift());
    if (currentCategory() == "Sports") console.log(sportsQuestions.shift());
    if (currentCategory() == "Rock") console.log(rockQuestions.shift());
  };

  const canLeavePenaltyBox = function(roll) {
    return roll % 2 != 0
  };

  const proceedWithCurrentPlayer = function(roll) {
    places[currentPlayer] = places[currentPlayer] + roll;
    if (places[currentPlayer] > 11) {
      places[currentPlayer] = places[currentPlayer] - 12;
    }
    console.log(
      getCurrentPlayerName() + "'s new location is " + places[currentPlayer]
    );
    console.log("The category is " + currentCategory());
    askQuestion();
  };

  this.rotatePlayer = function() {
    currentPlayer += 1;
    if (currentPlayer == players.length) currentPlayer = 0;
  };

  this.roll = function(roll) {
    console.log(getCurrentPlayerName() + " is the current player");
    console.log("They have rolled a " + roll);

    if (inPenaltyBox[currentPlayer]) {
      if (canLeavePenaltyBox(roll)) {
        isGettingOutOfPenaltyBox = true;

        console.log(
          getCurrentPlayerName() + " is getting out of the penalty box"
        );

        proceedWithCurrentPlayer(roll);
      } else {
        console.log(
          getCurrentPlayerName() + " is not getting out of the penalty box"
        );
        isGettingOutOfPenaltyBox = false;
      }
    } else {
      proceedWithCurrentPlayer(roll);
    }
  };

  this.wasCorrectlyAnswered = function() {
    if (inPenaltyBox[currentPlayer] && !isGettingOutOfPenaltyBox) {
      return
    }
    console.log("Answer was correct!!!!");

    purses[currentPlayer] += 1;
    console.log(
      getCurrentPlayerName() +
      " now has " +
      purses[currentPlayer] +
      " Gold Coins."
    );
  };

  this.wasIncorrectlyAnswered = function() {
    console.log("Question was incorrectly answered");
    console.log(getCurrentPlayerName() + " was sent to the penalty box");
    inPenaltyBox[currentPlayer] = true;
  };
};
