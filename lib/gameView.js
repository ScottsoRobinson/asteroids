(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var DIM_X = window.innerWidth;
  var DIM_Y = window.innerHeight;

  var GameView = Asteroids.GameView = function (game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.backgroundImage = new Image();
    this.backgroundImage.src = "lib/SpaceBackground.jpg";
  };

  GameView.prototype.start = function () {

    this.bindKeyHandlers();
    Asteroids.gameInterval = window.setInterval(function () {
      this.game.step(this);

      }.bind(this), 20);

    Asteroids.moveInterval = window.setInterval(function () { moveCallback(); }, 40);
    Asteroids.fireInterval = window.setInterval(function() { fireCallback();}, 200);

  };

  GameView.prototype.stopGame = function (level, points) {
    window.clearInterval(Asteroids.gameInterval);
    window.clearInterval(Asteroids.moveInterval);
    window.clearInterval(Asteroids.fireInterval);
    this.bindEndGameKeyHandlers();
    var points = this.game.points;
    var level = this.game.level;
    console.log(points);
    console.log(level);
    var dimx = DIM_X;
    var dimy = DIM_Y;
    if (DIM_X > 1920){
      dimx = 1920;
    }
    if (DIM_Y > 1200){
      dimy = 1200;
    }
    var ctx = this.ctx;
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    ctx.drawImage(
      this.backgroundImage,
      0,
      0,
      dimx,
      dimy,
      0,
      0,
      DIM_X,
      DIM_Y
    );
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#000";
    ctx.font = "30px serif";
    ctx.textAlign = "center";
    ctx.fillText(
      "Game Over, you had " + points + " points and died at level " + level + ".",
      DIM_X / 2,
      40
    );
    ctx.font = "20px serif";
    ctx.fillText(
      "Press enter to play again!",
      DIM_X/2,
      80
    )

  }

  var moveCallback = function () {
    if(key.isPressed("up")) this.game.ship.power();
    if(key.isPressed("left")) this.game.ship.turnLeft();
    if(key.isPressed("right")) this.game.ship.turnRight();
    if(key.isPressed("down")) this.game.ship.stop();
  };

  var fireCallback = function () {
    if(key.isPressed("space")) this.game.ship.fireBullet();
  };

  GameView.prototype.bindKeyHandlers = function(){
    gameView = this;

    key('space', function(){gameView.game.ship.fireBullet()})
  };

  GameView.prototype.bindEndGameKeyHandlers = function () {
    gameView = this;
    key.unbind('space');
    key('enter', function(){
      gameView.start();
      key.unbind('enter');
    })
  };

})();
