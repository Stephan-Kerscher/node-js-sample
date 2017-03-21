Game.Preloader = function (game){

  this.preloadBar = null;
};

Game.Preloader.prototype = {
  preload:function(){

    this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, "preloaderBar");

    this.preloadBar.anchor.setTo(0.5, 0.5);
    this.time.advancedTiming = true;
    this.load.setPreloadSprite(this.preloadBar);

    //LOAD ALL ASSETS
    this.game.load.image("student", "resources/assets/Sprites/walking_student_R.png");
    this.game.load.image("desk", "resources/assets/Maps/deskDunkel64.png");
    this.game.load.image("downstairs", "resources/assets/Maps/wegDunkel64.png");
    this.game.load.image("upperstairs", "resources/assets/Maps/wegHell64.png");
    this.game.load.image("tower", "resources/assets/towers/coffee-tower.png");
    this.game.load.image("bullet","resources/assets/towers/testbullet.png");
    this.game.load.spritesheet("defaultEnemySheet","resources/assets/sprites/studentSpriteFrames2.png", 44,44);
    this.game.load.spritesheet("tankEnemySheet","resources/assets/sprites/tankSpriteFrames.png", 44,44);
    this.game.load.spritesheet("fastEnemySheet","resources/assets/sprites/fastSpriteFrames.png", 44,44);
  },

  create:function(){
    this.state.start("MainMenu");
  },
};
