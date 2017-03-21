var pathPoints, StudentEnemy, life, wave;

//  Here is a custom game object
StudentEnemy = function (game, x, y, studentClass, type) {

  if (type == "default"){
    Phaser.Sprite.call(this, game, x, y, "defaultEnemySheet");}
  if (type == "tank"){
    Phaser.Sprite.call(this, game, x, y, "tankEnemySheet");}
  if (type == "fast"){
    Phaser.Sprite.call(this, game, x, y, "fastEnemySheet");}

    //Animations for the Prototype Class
  this.type = type;
  this.frame = 0;
  this.animations.add("right", [0,1,],10,true);
  this.animations.add("left", [2,3,],10,true);
  this.animations.add("up", [4,5,],7,true);
  this.animations.add("down", [6,7,],7,true);
  this.animations.add("hit", [8,],1,true);
  this.animations.play("up");
  this.studentClass = studentClass;
  this.anchor.setTo(0.5, 0.5);
  this.width = this.width * 1.2;
  this.height = this.height * 1.2;

  if (type == "default"){
    this.setHealth(50);}
  if (type == "tank"){
    this.setHealth(100);}
  if (type == "fast"){
    this.setHealth(30);}
};

StudentEnemy.prototype = Object.create(Phaser.Sprite.prototype);
StudentEnemy.prototype.constructor = StudentEnemy;

StudentEnemy.prototype.i = 0;
StudentEnemy.prototype.timerStopped = true;
StudentEnemy.prototype.pathPoints = pathPoints = {
  "x":[95, 95, 160, 220, 280, 350, 350, 350, 280, 220, 160, 95, 95, 95, 160, 220, 280, 340, 370, 400, 430, 490, 550, 610, 670, 670, 670, 610, 550, 490, 415, 415, 415, 490, 550, 610, 670, 670, 670,],
  "y":[360, 290, 290, 290, 290, 290, 230, 160, 160, 160, 160, 160, 100, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 90, 160, 160, 160, 160, 160, 230, 290, 290, 290, 290, 290, 350,450,],
};

/**
 * Automatically called by World.update
 */
StudentEnemy.prototype.update = function() {
  if (this.timerStopped) {
    this.timerStopped = false;
    this.timer = this.game.time.create(true);
    this.timer.loop(.01, this.plot, this);
    this.timer.start();
  }

};

StudentEnemy.prototype.plot= function () {
  var lifeDisplay= document.querySelector(".live");
  //var waveDisplay = document.querySelector(".wave");
  if (this.type == "default"){
    this.increment = 0.00035;}
  if (this.type == "tank"){
    this.increment = 0.00015;}
  if (this.type == "fast"){
    this.increment = 0.0007;}
  //this.increment = 0.00035;
  var posx = Phaser.Math.linearInterpolation(this.pathPoints.x, this.i);
  var posy = Phaser.Math.linearInterpolation(this.pathPoints.y, this.i);

    //Difference of x and y to check for sprite direction
  var xDifference = posx - this.x;
  var yDifference = posy - this.y;

  this.x = posx;
  this.y = posy;
  this.i += this.increment;

    //Checking Direction of the Sprite and playing frames accordingly
  if(yDifference<0){
    this.animations.play("up");}
  else if (yDifference>0){this.animations.play("down");}
  if(xDifference<0){
    this.animations.play("left");}
  else if(xDifference>0) {this.animations.play(("right"));}

  if (posy > 384 && this.alive == true) {
    this.kill();
    this.timer.stop();
    this.timer.destroy();
    this.i = 0;
    this.timerStopped = true;
    if (lifeDisplay.innerHTML > 0){
      lifeDisplay.innerHTML-= 1;
    }else{
      this.game.state.start("GameOver");
    }
  }

};
