Game.MainMenu = function(game){};

Game.MainMenu.prototype = {
  create: function(){
    var startSolo = document.querySelector(".start-solo");
    var startMulti = document.querySelector(".start-multi");
    var startScreen = document.querySelector(".menu-screen");
    if(startScreen.className == "hidden"){
      startScreen.classList.remove("hidden");
    }

    startSolo.onclick = function(){
      startScreen.className += " hidden";
      this.state.start("SoloGame");
    }.bind(this);
  },
};
