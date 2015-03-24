(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }



  var Ship = Asteroids.Ship = function (objectParams) {
    Asteroids.MovingObject.call(this, objectParams);
  };

  Ship.RADIUS = 10;
  Ship.COLOR = "#ff0000"

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
    this.orientation = 0;
  };

  Ship.prototype.power = function (impulse) {
    console.log(impulse, this.vel);
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
  };

  Ship.prototype.reorient = function (direction) {

  };

  Ship.prototype.fireBullet = function () {
    console.log("adding a bullet");
    var ship = this;
    var position = this.pos.slice(0);
    var velocity = this.vel.slice(0);
    var norm = Math.sqrt(Math.pow(velocity[0], 2) + Math.pow(velocity[1], 2));
    var bullet_vel = [velocity[0]*15/(norm), velocity[1]*15/(norm)];

    game.bullets.push(new Asteroids.Bullet({
      pos: this.pos.slice(0),
      vel: bullet_vel,
      color: "#ff0000",
      radius: 1,
      game: this.game
    }));

  }

})();
