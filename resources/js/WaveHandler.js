var WaveHandler;

WaveHandler = function(game, studentGroup) {

    WaveHandler.prototype.createStudent = function () {
        var studentEnemy = new StudentEnemy(game, 95, 360, 0, "default");
        game.add.existing(studentEnemy);
        studentGroup.add(studentEnemy);
    }

    WaveHandler.prototype.createTank = function () {
        var tank = new StudentEnemy(game, 95, 360, 0, "tank");
        game.add.existing(tank);
        studentGroup.add(tank);
    }

    WaveHandler.prototype.createSportStudent = function () {
        var fast = new StudentEnemy(game, 95, 360, 0, "fast");
        game.add.existing(fast);
        studentGroup.add(fast);
    }

    WaveHandler.prototype.spawnFirstWave = function () {
        game.time.events.repeat(1000, 10, createStudent, this);
    }

    WaveHandler.prototype.spawnSecondWave = function () {
        game.time.events.repeat(1000, 3, createSportStudent, this);
        game.time.events.repeat(1000, 7, createStudent, this);
    }

    WaveHandler.prototype.spawn3Wave = function () {
        game.time.events.repeat(1000, 1, createTank, this);
        game.time.events.repeat(1000, 9, createStudent, this);
    }

    WaveHandler.prototype.spawn4Wave = function () {
        game.time.events.repeat(1000, 1, createTank, this);
        game.time.events.repeat(1000, 4, createSportStudent, this);
        game.time.events.repeat(1000, 15, createStudent, this);
    }

    WaveHandler.prototype.spawn5Wave = function () {
        game.time.events.repeat(1000, 5, createTank, this);
        game.time.events.repeat(1000, 15, createStudent, this);
    }


    WaveHandler.prototype.spawn6Wave = function () {
        game.time.events.repeat(1000, 40, createStudent, this);
    }

    WaveHandler.prototype.spawn7Wave = function () {
        game.time.events.repeat(1000, 30, createSportStudent, this);
    }

    WaveHandler.prototype.spawn8Wave = function () {
        game.time.events.repeat(1000, 20, createTank, this);
    }

    WaveHandler.prototype.spawn9Wave = function () {
        game.time.events.repeat(1000, 20, createTank, this);
        game.time.events.repeat(1000, 20, createSportStudent, this);
        game.time.events.repeat(1000, 10, createStudent, this);
    }

    WaveHandler.prototype.spawnFinalWave = function () {
        game.time.events.repeat(1000, 50, createTank, this);
        game.time.events.repeat(1000, 50, createSportStudent, this);
        game.time.events.repeat(1000, 50, createStudent, this);
    }

}
