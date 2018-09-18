module.exports = function Player(name) {
  this.name = name;
  this.place = 0;
  this.purse = 0;
  this.isInPenaltyBox = false;

  this.movePlayer = function(roll) {
    this.place += roll;
    if (this.place > 11) {
      this.place -= 12;
    }
  }

  this.incrementPurse = function() {
    this.purse += 1;
  }
}
