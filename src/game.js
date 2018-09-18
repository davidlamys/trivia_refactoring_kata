var Player = require("./player");

module.exports = function Game() {
  const players = [];
  const places = [];
  const purses = [];
  const inPenaltyBox = [];

  const popQuestions = [];
  const scienceQuestions = [];
  const sportsQuestions = [];
  const rockQuestions = [];

  let currentPlayerIndex = 0;
  let isGettingOutOfPenaltyBox = false;

  this.didPlayerWin = function() {
    return !(purses[currentPlayerIndex] == 6);
  };

  const currentCategory = function() {
    const currentPlace = places[currentPlayerIndex]
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
    return players[currentPlayerIndex].name
  }

  this.add = function(playerName) {
    const player = new Player(playerName);
    const playersCount = players.push(player);
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
    places[currentPlayerIndex] = places[currentPlayerIndex] + roll;
    if (places[currentPlayerIndex] > 11) {
      places[currentPlayerIndex] = places[currentPlayerIndex] - 12;
    }
    console.log(
      getCurrentPlayerName() + "'s new location is " + places[currentPlayerIndex]
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

    if (inPenaltyBox[currentPlayerIndex]) {
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
    if (inPenaltyBox[currentPlayerIndex] && !isGettingOutOfPenaltyBox) {
      return
    }
    console.log("Answer was correct!!!!");

    purses[currentPlayerIndex] += 1;
    console.log(
      getCurrentPlayerName() +
      " now has " +
      purses[currentPlayerIndex] +
      " Gold Coins."
    );
  };

  this.wasIncorrectlyAnswered = function() {
    console.log("Question was incorrectly answered");
    console.log(getCurrentPlayerName() + " was sent to the penalty box");
    inPenaltyBox[currentPlayerIndex] = true;
  };
};
