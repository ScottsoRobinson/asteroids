(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var DIM_X = window.innerWidth;
  var DIM_Y = window.innerHeight;
  var NUM_ASTEROIDS = 2;

  var Game =  Asteroids.Game = function(ctx){
    this.ctx = ctx;
    this.asteroids = [];
    this.level = 1;
    this.points = 0;
    this.lives = 5;
    this.addAsteroids(NUM_ASTEROIDS);
    var game = this;
    this.bullets = [];

    this.ship = new Asteroids.Ship({
            pos: game.randomPosition(),
            vel: [0,0],
            radius: Asteroids.Ship.RADIUS,
            game: game,
            lives: game.lives
    });

    this.backgroundImage = new Image();
    this.backgroundImage.src = "lib/SpaceBackground.jpg";
  };

  Game.prototype.allObjects = function(){
    var objectsArray = [];
    objectsArray = objectsArray.concat(this.asteroids);
    objectsArray = objectsArray.concat(this.bullets);
    objectsArray.push(this.ship);
    return objectsArray;
  };

  Game.prototype.randomPosition = function(){
    x = Math.floor(DIM_X*Math.random());
    y = Math.floor(DIM_Y*Math.random());
    return [x,y];
  };

  Game.prototype.outerPosition = function () {
    var checker = Math.random();
    if (checker < 0.5) {
      x = Math.floor(DIM_X*Math.random());
      y = 0;
    } else {
      y = Math.floor(DIM_Y*Math.random());
      x = 0;
    }
    return [x,y];
  }

  Game.prototype.addAsteroids = function(number){
    for (var i = 0; i < number; i++){
      var pos = this.outerPosition();
      var ast = new Asteroids.Asteroid({pos: pos, game: this});
      this.asteroids.push(ast);
    };
  };

  Game.prototype.levelUp = function () {
    this.level += 1;
    this.addAsteroids(this.level + 1);
  };

  Game.prototype.draw = function(){

    ctx = this.ctx;
    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    ctx.drawImage(
      this.backgroundImage,
      0,
      0,
      DIM_X,
      DIM_Y,
      0,
      0,
      DIM_X,
      DIM_Y
    )
    var objects = this.allObjects();
    objects.forEach (function(asteroid) {
      ctx.save();
      asteroid.draw(ctx);
      ctx.restore();
    });

    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#000";
    ctx.font = "18px serif";
    ctx.textAlign = "center";
    ctx.fillText(
      "Points:  " + this.points + "  |  Lives:  " + this.lives + "  |  Level:  " + this.level,
      DIM_X / 2,
      20
    );

    // Asteroids.drawId = window.requestAnimationFrame(this.draw.bind(this));
  };

  Game.prototype.moveObjects = function () {
    var objects = this.allObjects();
    objects.forEach (function(object) {
      object.move();
    });
  };


  Game.prototype.isOutOfBounds = function (pos) {
    outOfBounds = false;
    if (pos[0] < 0){
      outOfBounds = true;
    } else if (pos[0] > DIM_X) {
      outOfBounds =  true;
    } else if (pos[1] < 0) {
      outOfBounds = true;
    } else if (pos[1] > DIM_Y) {
      outOfBounds = true;
    }
    return outOfBounds;

  };

  Game.prototype.wrap = function (pos) {
    var new_pos = pos.slice();
    if (pos[0] > DIM_X) {
      new_pos[0] -= DIM_X;
    } else if (pos[0] < 0) {
      new_pos[0] += DIM_X;
    } else if (pos[1] < 0) {
      new_pos[1] += DIM_Y;
    } else if (pos[1] > DIM_Y) {
      new_pos[1] -= DIM_Y;
    }

    return new_pos;
  };

  Game.prototype.checkCollisions = function () {
    var objects = this.allObjects();
    for (var i = 0; i < objects.length - 1 ; i++){
      for (var j = i+1; j < objects.length; j++){
        if (objects[i].isCollidedWith(objects[j])){
          objects[i].collideWith(objects[j]);
          objects[j].collideWith(objects[i]);
        }
      };
    };
  };

  Game.prototype.step = function (gameView) {
    if (this.lives <= 0) {
      var level = this.level;
      var points = this.points;
      gameView.stopGame(level, points);
      this.lives = 5;
      this.level = 1;
      this.bullets = [];
      this.points = 0;
      this.asteroids = [];
      this.addAsteroids(NUM_ASTEROIDS);
    }else {
      this.ship.slow();
      this.draw();
      this.moveObjects();
      this.checkCollisions();
    }
  };

  Game.prototype.split = function (asteroid) {
    var pos = asteroid.pos.slice(0);
    var radius = asteroid.radius/Math.sqrt(2);
    for (i=0; i<2; i++){
      console.log("adding asteroid");
      var ast = new Asteroids.Asteroid({pos: pos.slice(0), game: this, radius: radius})
      this.add(ast);
    };
    this.remove(asteroid);
  };

  Game.prototype.remove = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      var idx = this.asteroids.indexOf(obj);
      this.points += 1;
      this.asteroids.splice(idx, 1);
      if (this.asteroids.length === 0){
        this.levelUp();
      }
      // var pos = this.randomPosition();
      // var ast = new Asteroids.Asteroid({pos: pos, game: this});
      // this.add(ast);
    }else if (obj instanceof Asteroids.Bullet){
      var idx = this.bullets.indexOf(obj);
      this.bullets.splice(idx, 1);
    }
  };

  Game.prototype.add = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      this.asteroids.push(obj);
    }

    if (obj instanceof Asteroids.Bullet) {
      this.bullets.push(obj);
    }
  };

})();
