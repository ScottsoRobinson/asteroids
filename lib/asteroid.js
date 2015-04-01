(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }



  var Asteroid = Asteroids.Asteroid = function(objectParams){
    Asteroids.MovingObject.call(this,
      {pos: objectParams.pos,
       vel: Asteroids.Util.randomVec(2),
       color: Asteroid.COLOR,
       radius: objectParams.radius || Asteroid.RADIUS,
       game: objectParams.game});
    
    this.radius = objectParams.radius || Asteroid.RADIUS;
    this.asteroidImage = new Image();
    this.asteroidImage.src = "lib/AsteroidSprite.png";

  };
  Asteroid.COLOR = "#000";
  Asteroid.RADIUS = 39;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.draw = function(ctx){
    ctx.drawImage(
      this.asteroidImage,
      20,
      20,
      90,
      90,
      this.pos[0] - 1.25*this.radius,
      this.pos[1] - 1.25*this.radius,
      2.5*this.radius,
      2.5*this.radius
    )
  };

  Asteroid.prototype.collideWith = function (otherObject){
    if (otherObject instanceof Asteroids.Ship) {
      otherObject.relocate();
    }else if (otherObject instanceof Asteroids.Bullet){
      game.remove(otherObject);
    }
  }

})();
