(function () {
  if (typeof window.Asteroids === "undefined") {
    window.Asteroids = {};
  }



  var Ship = Asteroids.Ship = function (objectParams) {
    Asteroids.MovingObject.call(this, objectParams);
    this.shipImage = new Image();
    this.direction = [0,1];
    this.angle = 0;
    this.shipImage.src = "lib/SpaceShip.png";
    this.imageWidth = 350;
    this.imageHeight = 350;
    this.frameIndex = 0;
    this.tickCount = 0;
    this.ticksPerFrame = this.ticksPerFrame || 0;
  };

  Ship.RADIUS = 15;
  Ship.COLOR = "#ff0000"

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.prototype.relocate = function () {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];

  };

  Ship.prototype.update = function () {

  };

  Ship.prototype.draw = function (ctx) {
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(Math.atan2(this.direction[1] * -1, this.direction[0]));
    ctx.drawImage(
    this.shipImage,
    0,
    0,
    this.imageWidth,
    this.imageHeight,
    this.imageWidth / -18,
    this.imageHeight / -18,
    this.radius * 2.5,
    this.radius * 2.5
    );
      // ctx.drawImage(
      //   this.shipImage,
      //   0,
      //   0,
      //   84,
      //   84,
      //   this.pos[0] - 1.5*Ship.RADIUS,
      //   this.pos[1] - 1.5*Ship.RADIUS,
      //   3*Ship.RADIUS,
      //   3*Ship.RADIUS
      // )
  };

  // Ship.prototype.power = function (impulse) {
  //
  //   this.vel[0] += impulse[0];
  //   this.vel[1] += impulse[1];
  //   var norm = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
  //   if ((Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2)) > 100) {
  //     this.vel[0] = this.vel[0]*10/norm;
  //     this.vel[1] = this.vel[1]*10/norm;
  //   }
  // };

  Ship.prototype.power = function () {
    var mult = .75;
    this.vel[0] += this.direction[0] * mult;
    this.vel[1] += this.direction[1] * mult * -1;
    var norm = Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2));
    if ((Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2)) > 100) {
      this.vel[0] = this.vel[0]*10/norm;
      this.vel[1] = this.vel[1]*10/norm;
    }
  };

  Ship.prototype.stop = function () {
    var stoppingMult = 0.90;
    this.vel[0] *= stoppingMult;
    this.vel[1] *= stoppingMult;
  };

  Ship.prototype.turnLeft = function () {
    var theta = (Math.PI / 30);
    this.angle -= theta;
    this.direction[0] = Math.sin(this.angle);
    this.direction[1] = Math.cos(this.angle);
  };

  Ship.prototype.turnRight = function () {
    var theta = (Math.PI / 30);
    this.angle += theta;
    this.direction[0] = Math.sin(this.angle);
    this.direction[1] = Math.cos(this.angle);
  };

  Ship.prototype.reorient = function (direction) {

  };

  Ship.prototype.fireBullet = function () {
    game.bullets.push(new Asteroids.Bullet({
      pos: this.pos.slice(0),
      vel: [this.direction[0] * 15, this.direction[1] * -15],
      radius: 2.5,
      game: this.game
    }));
  };

  // Ship.prototype.fireBullet = function () {
  //
  //   var ship = this;
  //   var position = this.pos.slice(0);
  //   var velocity = this.vel.slice(0);
  //   var norm = Math.sqrt(Math.pow(velocity[0], 2) + Math.pow(velocity[1], 2));
  //   var bullet_vel = [velocity[0]*15/(norm), velocity[1]*15/(norm)];
  //
  //   game.bullets.push(new Asteroids.Bullet({
  //     pos: this.pos.slice(0),
  //     vel: bullet_vel,
  //     color: "#ff0000",
  //     radius: 2,
  //     game: this.game
  //   }));
  //
  // }

})();
