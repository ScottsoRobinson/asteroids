(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var DIM_X = 1200;
  var DIM_Y = 600;
  var NUM_ASTEROIDS = 6;

  var Game =  Asteroids.Game = function(){
    this.asteroids = [];
    this.addAsteroids(NUM_ASTEROIDS);
    var game = this;
    this.bullets = [];

    this.ship = new Asteroids.Ship({
            pos: game.randomPosition(),
            vel: [0,0],
            color: Asteroids.Ship.COLOR,
            radius: Asteroids.Ship.RADIUS,
            game: game
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
  }

  Game.prototype.randomPosition = function(){
    x = Math.floor(DIM_X*Math.random());
    y = Math.floor(DIM_Y*Math.random());
    return [x,y];
  }

  Game.prototype.addAsteroids = function(number){
    for (var i = 0; i < number; i++){
      var pos = this.randomPosition();
      var ast = new Asteroids.Asteroid({pos: pos, game: this});
      this.asteroids.push(ast);
    };
  };



  Game.prototype.draw = function(ctx){

    ctx.clearRect(0, 0, DIM_X, DIM_Y);
    ctx.drawImage(
      this.backgroundImage,
      0,
      0,
      1920,
      1200,
      0,
      0,
      1200,
      600
    )
    var objects = this.allObjects();
    objects.forEach (function(asteroid) {
      asteroid.draw(ctx);
    });
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

  Game.prototype.step = function () {
    this.moveObjects();
    this.checkCollisions();
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
      this.asteroids.splice(idx, 1);
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
