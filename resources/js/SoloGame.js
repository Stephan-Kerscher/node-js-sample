var j,
  upperFloor,
  downFloor,
  studentGroup,
  StudentEnemy,
  controller,
  weapon,

  waveDisplay,
  waveHandler,

  xcoordinates,
  ycoordinates,
  weapons,
  towers,
  money = 50,
  // Design the level. x = desk, o = downFloor, ! = upperFloor.
  level = [
    "xooooo!!!!!x",
    "xoxxxxxxxx!x",
    "xooooo!!!!!x",
    "xxxxxo!xxxxx",
    "xooooo!!!!!x",
    "xoxxxxxxxx!x",
  ];

const SECOND_WAVE_LENGTH = 20, THIRD_WAVE_LENGTH = 30, FOURTH_WAVE_LENGTH = 50,FIFTH_WAVE_LENGTH = 70,SIXTH_WAVE_LENGTH = 110,SEVENTH_WAVE_LENGTH = 140,EIGHTH_WAVE_LENGTH = 160, NINTH_WAVE_LENGTH = 210;

Game.SoloGame = function(game){};

Game.SoloGame.prototype = {
  create:function(){
    xcoordinates = [];
    ycoordinates = [];
    weapons = [];
    towers = [];

    this.desks = this.game.add.group();
    this.downFloors = this.game.add.group();
    this.upperFloors = this.game.add.group();
    studentGroup = this.game.add.group();

    controller = new Controller();
    controller.setTowerBarOnClick(this.desks);

    //Bullet Physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

  // Create the level by going through the array
    for (i = 0; i < level.length; i++) {
      for (j = 0; j < level[i].length; j++) {

        // Create a desk texture and add it to the 'desks' group
        if (level[i][j] == "x") {
          desk = this.game.add.sprite(64*j,64*i, "desk");



          this.desks.add(desk);
          //onClick Listener
          desk.inputEnabled = true;
          desk.events.onInputDown.add(function(desk){
            //this.desks.alpha = 1;

            //Je nachdem welches Tower-Bildelement die Klasse selected besitzt, wird dieses erstellt.
            //Aktuell nur towerA
            var selectedTower = document.querySelector(".selected");

            //add "tower" texture
            if (selectedTower != null){
                if (selectedTower.alt == "towerA" && money >= 10 ) {
                  towerBackground(this, desk);
                  //var tower = new Tower(this.game, desk.x + 32, desk.y + 30, money, selectedTower);
                  tower = this.game.add.sprite(desk.x + 32, desk.y + 30, "tower");
                  tower.anchor.set(0.5);

                  towers.push(tower);
                  //weapons.push(tower.createWeapon(tower));
                  weapon = this.game.add.weapon(30,"bullet");
                  weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
                  weapon.bulletSpeed = 200;
                  weapon.fireRate = 2000;

                  this.game.physics.enable(tower, Phaser.Physics.ARCADE);
                  //tower.body.allowRotation = false;

                  weapon.trackSprite(tower,0,0,true);
                  weapons.push(weapon);

                  //console.log(tower.createWeapon(tower));
                  xcoordinates.push(desk.x + 32);
                  ycoordinates.push(desk.y + 30);
                  money = controller.updateMoney(money);
                }else if (money < 10){
                  console.log("Too less money");
                }else{
                  console.log("Choose another tower");
                }

            }
            this.desks.alpha = 1;
            controller.deleteSelectedClass();
            //noTower(this, desk);

          }, this);

        }
          // Create a downFloor texture and add it to the 'downFloors' group
        else if (level[i][j] == "o") {
          downFloor = this.game.add.sprite(64*j, 64*i, "downstairs");
          this.downFloors.add(downFloor);
        }
          // Create a upperFloor texture and add it to the 'upperFloors' group
        else if (level[i][j] == "!") {
          upperFloor = this.game.add.sprite(64*j, 64*i, "upperstairs");
          this.upperFloors.add(upperFloor);
        }
      }
    }

    //Spawn first wave

    waveHandler = new WaveHandler(this.game,studentGroup);

    waveDisplay = document.querySelector(".wave");
    this.game.time.events.add(1000, waveHandler.spawnFirstWave, this);

    createStudent = function () {
      waveHandler.createStudent();};

    createSportStudent = function () {
      waveHandler.createSportStudent();};

    createTank = function () {
      waveHandler.createTank();};

    function towerBackground(context, sprite){
        //remove texture "desk" and add tower
      context.desks.remove(sprite);
        //context.desks.alpha = 1;
      wallBack = context.game.add.sprite(sprite.x, sprite.y, "desk");
    }
  },

  update:function(){
    /*this.studentGroup.forEachAlive(function(student){
      console.log(student);
      if (towers != null){
        //var that = this.tower;
        for(var i = 0; i < weapons.length; i++){
        towers[i].aim(student, weapons[i], xcoordinates[i], ycoordinates[i]);
          /*var distance = Phaser.Math.distance(xcoordinates[i], ycoordinates[i], student.x, student.y);
          if (distance<100 && student.alive == true){
            weapons[i].fireAtSprite(student);
          }
        }
      }*/
    studentGroup.forEachAlive(function(studentEnemy){
     for(var i = 0; i < xcoordinates.length; i++){
       if(weapons != null){
     //Shooting a weapon
         var distance = Phaser.Math.distance(xcoordinates[i], ycoordinates[i],studentEnemy.x,studentEnemy.y);
     //console.log(distance,weapon.x,weapon.y,student.x,student.y);
         if (distance<100 && studentEnemy.alive == true){
           console.log(studentEnemy.x);
           console.log(weapons[i]);
           weapons[i].fireAtSprite(studentEnemy);
         }
     //student gets killed by bullet
         if (checkOverlap(weapons[i].bullets,studentEnemy)){
           studentEnemy.health -= 25;
           weapons[i].killAll();
           if (studentEnemy.health <=0){
             studentEnemy.kill();
             money += 5;
             document.querySelector(".money").innerHTML = money;

           }
         }
       }}
    });

    //Spawning the waves
 //console.log(studentGroup.length, studentGroup.countDead());

    if (studentGroup.length > 0 && studentGroup.countDead() == studentGroup.length) {
      if (waveDisplay.innerHTML == 1) {
        waveDisplay.innerHTML++;
        this.game.time.events.add(2000, waveHandler.spawnSecondWave, this);
      }
      if (waveDisplay.innerHTML == 2 && studentGroup.length == SECOND_WAVE_LENGTH) {
        waveDisplay.innerHTML++;
        this.game.time.events.add(2000, waveHandler.spawn3Wave, this);
      }
      if (waveDisplay.innerHTML == 3 && studentGroup.length == THIRD_WAVE_LENGTH) {
        waveDisplay.innerHTML++;
        this.game.time.events.add(2000, waveHandler.spawn4Wave, this);
      }
      if (waveDisplay.innerHTML == 4 && studentGroup.length == FOURTH_WAVE_LENGTH) {
        waveDisplay.innerHTML++;
        this.game.time.events.add(2000, waveHandler.spawn5Wave, this);
      }
      if (waveDisplay.innerHTML == 5 && studentGroup.length == FIFTH_WAVE_LENGTH) {
        waveDisplay.innerHTML++;
        this.game.time.events.add(2000, waveHandler.spawn6Wave, this);
      }
      if (waveDisplay.innerHTML == 6 && studentGroup.length == SIXTH_WAVE_LENGTH) {
        waveDisplay.innerHTML++;
        this.game.time.events.add(2000, waveHandler.spawn7Wave, this);
      }
      if (waveDisplay.innerHTML == 7 && studentGroup.length == SEVENTH_WAVE_LENGTH) {
        waveDisplay.innerHTML++;
        this.game.time.events.add(2000, waveHandler.spawn8Wave, this);
      }
      if (waveDisplay.innerHTML == 8 && studentGroup.length == EIGHTH_WAVE_LENGTH) {
        waveDisplay.innerHTML++;
        this.game.time.events.add(2000, waveHandler.spawn9Wave, this);
      }
      if (waveDisplay.innerHTML == 9 && studentGroup.length == NINTH_WAVE_LENGTH) {
        waveDisplay.innerHTML++;
        this.game.time.events.add(2000, waveHandler.spawnFinalWave, this);
      }
      if (waveDisplay.innerHTML > 10) {
        this.game.state.start("GameState");
      }
    }
  },
};

//Checks if two sprites are OVERLAPPING
function checkOverlap(spriteA, spriteB){
  var boundsA = spriteA.getBounds();
  var boundsB = spriteB.getBounds();
  return Phaser.Rectangle.intersects(boundsA,boundsB);
}

function deleteSelectedClass(){
  var allSelectedTowers = document.querySelectorAll(".selected");
  for(var i = 0; i < allSelectedTowers.length; i++){
    allSelectedTowers[i].classList.remove("selected");
  }
}
