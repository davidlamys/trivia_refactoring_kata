module.exports = function Board() {
  const popQuestions = [];
  const scienceQuestions = [];
  const sportsQuestions = [];
  const rockQuestions = [];

  for (var i = 0; i < 50; i++) {
    popQuestions.push("Pop Question " + i);
    scienceQuestions.push("Science Question " + i);
    sportsQuestions.push("Sports Question " + i);
    rockQuestions.push("Rock Question " + i);
  }

  this.getCategory = function(currentPlace) {
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

  this.getQuestion = function(currentPlace) {
    const currentCategory = this.getCategory(currentPlace);
      if (currentCategory == "Pop") return (popQuestions.shift());
      if (currentCategory == "Science") return (scienceQuestions.shift());
      if (currentCategory == "Sports") return (sportsQuestions.shift());
      if (currentCategory == "Rock") return (rockQuestions.shift());
  }

};
