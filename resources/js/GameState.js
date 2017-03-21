Game.GameState = function(game){};

var waveSurvived = 10;

Game.GameState.prototype = {
  create: function(){
    document.querySelector(".end-screen").classList.remove("hidden");
    var retryButton = document.querySelector(".retry");
    var backButton = document.querySelector(".back");
    var waveDisplay = document.querySelector(".wave");

    if(waveDisplay.innerHTML < waveSurvived){
      document.querySelector(".gamestate").innerHTML = "GAME OVER";
    }

    retryButton.onclick = function(){
      document.querySelector(".end-screen").className += " hidden";
      this.state.start("SoloGame");
    }.bind(this);

    backButton.onclick = function(){
      document.querySelector(".end-screen").className += " hidden";
      this.state.start("MainMenu");
    }.bind(this);

  },
};
