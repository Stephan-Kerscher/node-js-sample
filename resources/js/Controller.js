var Controller, controller;

Controller = function(){

   Controller.prototype.setTowerBarOnClick = function(desks){
    var towerBar = document.querySelectorAll(".Towerbar img");
    //Setzt das jeweilige Tower-Bildelement in der Towerbar auf die Klasse selected

    for (var i = 0; i < towerBar.length; i ++){
      var selectTower = towerBar[i];


      selectTower.onclick = function(){
        //set all towers deselected
        deleteSelectedClass();
        this.className = "selected";
        desks.alpha = 0.5;
      };
    }
  }

  Controller.prototype.updateMoney = function(money){
    money -= 10;
    var moneyDisplay = document.querySelector(".money");
    moneyDisplay.innerHTML = money;
    return money;
  }

  Controller.prototype.deleteSelectedClass = function(){
    var allSelectedTowers = document.querySelectorAll(".selected");
    for(var i = 0; i < allSelectedTowers.length; i++){
      allSelectedTowers[i].classList.remove("selected");
    }
  }

};
