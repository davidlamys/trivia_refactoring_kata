module.exports = function Board() {
  const popQuestions = [];
  const scienceQuestions = [];
  const sportsQuestions = [];
  const rockQuestions = [];

  const generateQuestion = function(category, index) {
    return category + " Question " + index
  }

  for (var i = 0; i < 50; i++) {
    popQuestions.push(generateQuestion("Pop", i));
    scienceQuestions.push(generateQuestion("Science", i));
    sportsQuestions.push(generateQuestion("Sports", i));
    rockQuestions.push(generateQuestion("Rock", i));
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
