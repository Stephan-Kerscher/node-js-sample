var Tower, tower, xcoordinates, ycoordinates, weapon;

//  Here is a custom game object
Tower = function (game, x, y, money, selectedTower) {

  xcoordinates = [];
  ycoordinates = [];
  //weapons = [];

    //if (selectedTower.alt == "towerA" && money >= 10 ) {
      //towerBackground;

      tower = game.add.sprite(x, y, "tower");
      tower.anchor.set(0.5);

      //coordinates getting pushed in in array --> necessary for weapon aim
      //xcoordinates.push(x);
      //ycoordinates.push(y);

      //Kosten für den Tower werden abgezogen
      //money -= 10;

      //Kosten werden in der Anzeige aktualisiert
      //var moneyDisplay = document.querySelector(".money");
      //moneyDisplay.innerHTML = money;

      //Zusätzlich wird eine weapon erstellt
      /*weapon = game.add.weapon(30,"bullet");
      weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
      weapon.bulletSpeed = 200;
      weapon.fireRate = 2000;

      game.physics.enable(tower, Phaser.Physics.ARCADE);
      //tower.body.allowRotation = false;

      weapon.trackSprite(tower,0,0,true);*/
      //weapons.push(weapon);

    /*}else if (money < 10){
      console.log("Too less money");
      //noTower;
    }else{
      console.log("Choose another tower");
      //noTower;
    }*/
    //noTower;

  Tower.prototype.aim = function(student, weaponGun, x, y){
      //for(var i = 0; i < xcoordinates.length; i++){
        //if(weapons != null){
      //Shooting a weapon
          var distance = Phaser.Math.distance(x, y, student.x, student.y);
      //console.log(distance,weapon.x,weapon.y,student.x,student.y);
          if (distance<100 && student.alive == true){
            weaponGun.fireAtSprite(student);
          }
      //student gets killed by bullet
          if (checkOverlap(weaponGun.bullets,student)){
            student.health -= 25;
            weaponGun.killAll();
            if (student.health <=0){
              student.kill();
              money += 5;
              document.querySelector(".money").innerHTML = money;
            }
          }
        //}
      //}
  }

  Tower.prototype.getTower = function() {
    return tower;
  }

  Tower.prototype.getMoney = function() {
    return money;
  }

  Tower.prototype.getWeapon = function(){
    return weapon;
  }

  Tower.prototype.createWeapon = function(tower){
    weapon = game.add.weapon(30,"bullet");
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 200;
    weapon.fireRate = 2000;

    game.physics.enable(tower, Phaser.Physics.ARCADE);
    //tower.body.allowRotation = false;

    weapon.trackSprite(tower,0,0,true);

    return weapon;
  }
};
