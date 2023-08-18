class Player {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.width = 50;
    this.height = 50;
    this.speed = 5;
    this.vx = 0;
    this.vy = 0;
    this.jumpSpeed = 15;
    this.health = 100;
    this.onGround = false;
  }

draw(ctx) {
  if (this.health > 0) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y -20, this.health / 2, 10)
  }  
}

move(keyCode) {
  // Left arrow key
  if (keyCode === 37) {
    this.vx = -this.speed;
  }
  // Right arrow key
  else if (keyCode === 39) {
    this.vx = this.speed;
  }
  // Up arrow key
  else if (keyCode === 38 && this.onGround) {
    this.vy = -this.jumpSpeed;
    this.onGround = false;
  }  
}


} // End of play class (work in progress)
