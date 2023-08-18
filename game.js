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
  
  update() {
    this.x += this.vx;
    this.y += this.vy;
  
    if(!this.onGround) {
      this.vy += 1;
    }
    this.vx = 0;
  
    let onPlatform = false;
    for(let platform of platforms) {
      if (
        this.x < platform.x + platform.width &&
        this.x + this.width > platform.x &&
        this.y < platform.y + platform.height &&
        this.y + this.height > platform.y
      ) {
        if(this.vy > 0) {
          //move down
          this.y = platform.y - this.height;
          this.vy = 0;
          onPlatform = true;        
        }
        //move up
        else if(this.vy < 0) {
          this.y = platform.y + platform.height;
          this.vy = 0;        
        }
      }
    }
  
    if(onPlatform) {
      this.onGround = true;
    }
    else {
      this.onGround = false
    }
  }
  
  collidesWith(otherPlayer) {
    return (
      this.x < otherPlayer.x + otherPlayer.width &&
      this.x + this.width > otherPlayer.x &&
      this.y < otherPlayer.y + otherPlayer.height &&
      this.y + this.height > otherPlayer.y    
    );
  }
  
  attack(otherPlayer) {
    if(this.collidesWith(otherPlayer)) {
      otherPlayer.health -= 10;
    }
  }
} 
