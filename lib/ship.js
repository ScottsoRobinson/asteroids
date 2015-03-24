(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }



  var Ship = Asteroids.Ship = function (objectParams) {
    Asteroids.MovingObject.call(this, objectParams);
    this.shipImage = new Image();
    this.shipImage.src = "lib/SpaceShip.png";
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = this.ticksPerFrame || 0;
  };

  Ship.RADIUS = 20;
  Ship.COLOR = "#ff0000"

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
    this.orientation = 0;
  };

  Ship.prototype.update = function () {

  };

  Ship.prototype.draw = function (ctx) {

      ctx.drawImage(
        this.shipImage,
        0,
        0,
        84,
        84,
        this.pos[0] - 1.5*Ship.RADIUS,
        this.pos[1] - 1.5*Ship.RADIUS,
        3*Ship.RADIUS,
        3*Ship.RADIUS
      )
  };

  Ship.prototype.power = function (impulse) {

    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];
    var norm = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
    if ((Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2)) > 100) {
      this.vel[0] = this.vel[0]*10/norm;
      this.vel[1] = this.vel[1]*10/norm;
    }
  };

  Ship.prototype.reorient = function (direction) {

  };

  Ship.prototype.fireBullet = function () {

    var ship = this;
    var position = this.pos.slice(0);
    var velocity = this.vel.slice(0);
    var norm = Math.sqrt(Math.pow(velocity[0], 2) + Math.pow(velocity[1], 2));
    var bullet_vel = [velocity[0]*15/(norm), velocity[1]*15/(norm)];

    game.bullets.push(new Asteroids.Bullet({
      pos: this.pos.slice(0),
      vel: bullet_vel,
      color: "#ff0000",
      radius: 2,
      game: this.game
    }));

  }

})();
