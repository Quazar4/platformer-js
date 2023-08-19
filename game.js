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

class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const player1 = new Player(100, 100, 'red');
const player2 = new Player(100, 100, 'blue');

const platforms = [
  new Platform(0, canvas.height - 50, canvas.width - 50),
  new Platform(100, canvas.height - 150, 200, 20),
];

document.addEventListener('keydown', (event) => {
  player1.move(event.keyCode);
});

document.addEventListener('keydown', (event) => {
  //Space bar
  if(event.keyCode === 32) {
    player1.attack(player2);
  }
});

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let platform of platforms) {
    platform.draw(ctx)
  }
  player1.update();
  player1.draw(ctx);

  player2.update();
  player2.draw(ctx);

  if(player.health <= 0 || player2.health <= 0) {
    ctx.font = '30px Arial';
    ctx.fillStyle = 'black';
    let winner;
    if(player1.health <= 0) {
      winner = 'Player 2'
    }
    else {
      winner = 'Player 1'
    }
    ctx.fillText(`Game over, ${winner} won the game`, canvas.width / 2 - 150, canvas.height / 2);
  }
  else {
    requestAnimationFrame(update);
  }  
}

update();



