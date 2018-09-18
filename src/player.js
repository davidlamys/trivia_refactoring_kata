module.exports = function Player(name) {
  this.name = name;
  this.place = 0;

  this.movePlayer = function(roll) {
    this.place += roll;
    if (this.place > 11) {
      this.place -= 12;
    }
  }
}
