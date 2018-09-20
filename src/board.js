module.exports = function Board() {
  const popQuestions = [];
  const scienceQuestions = [];
  const sportsQuestions = [];
  const rockQuestions = [];

  const pop = "Pop";
  const science = "Science";
  const sports = "Sports";
  const rock = "Rock";

  const generateQuestion = function(category, index) {
    return `${category} Question ${index}`
  }

  for (var i = 0; i < 50; i++) {
    popQuestions.push(generateQuestion(pop, i));
    scienceQuestions.push(generateQuestion(science, i));
    sportsQuestions.push(generateQuestion(sports, i));
    rockQuestions.push(generateQuestion(rock, i));
  }

  this.getCategory = function(currentPlace) {
    switch (currentPlace%4) {
      case 0: return pop;
      case 1: return science;
      case 2: return sports;
      case 3: return rock;
    }
  };

  this.getQuestion = function(currentPlace) {
      const currentCategory = this.getCategory(currentPlace);
      if (currentCategory == pop) return (popQuestions.shift());
      if (currentCategory == science) return (scienceQuestions.shift());
      if (currentCategory == sports) return (sportsQuestions.shift());
      if (currentCategory == rock) return (rockQuestions.shift());
  }

};
