let marioTheme = new Audio("files/marioTheme.mp3");
let marioJump = new Audio("files/marioJump.mp3");
let addBlock = new Audio("files/addBlock.mp3");
let marioDeath = new Audio("files/marioDeath.mp3");
let marioWin = new Audio("files/marioWin.mp3");


const ground = new Image();
ground.src = "fotos/Brick.webp";
const mario = new Image();
mario.src = "fotos/mario.webp";
const marioBack = new Image();
marioBack.src = "fotos/marioBack.webp";
const creatureImage = new Image();
creatureImage.src = "fotos/creature.png";
const flag = new Image();
flag.src = "fotos/flag.png";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

const groundWidth = 50;
const groundHeight = 50;
ground.width = groundWidth;
ground.height = groundHeight;

const platformCount = 50;
const airPlatformCount = 4;
const pyramid = [];
const platforms = [];

const gravity = 0.8;
let frames = 0;
let creatureFrames = 0;
let movingDirection = "right";
let creatureMovingDirection = "left";
let isMovingRight = false;
let isMovingLeft = false;
let colision = false;
let rightRunLimit = false;
let leftRunLimit = false;
let isJumping = false;

const keys = {
  right: {
    pressed: false,
  },
  left: {
    pressed: false,
  },
};

class Player {
  constructor() {
    this.position = {
      x: 100,
      y: 350,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 50;
    this.height = 100;
    this.sprites = {
      run: {
        right: mario,
        left: marioBack,
      },
    };
  }
  draw() {
    const currentSprite =
      movingDirection === "right"
        ? this.sprites.run.right
        : this.sprites.run.left;

    ctx.drawImage(
      currentSprite,
      173 * Math.round(frames),
      0,
      150,
      220,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += gravity;
    } else if (this.position.y > canvas.height) {
      marioDeath.play();
      marioTheme.pause();
      initMario();
    }
  }
}
let player = new Player();

class Creature {
  constructor() {
    this.position = {
      x: 3900,
      y: 479,
    };
    this.velocity = {
      x: 0,
      y: 0,
    };
    this.width = 40;
    this.height = 50;
    this.sprites = creatureImage;
  }
  draw() {
    ctx.drawImage(
      this.sprites,
      30 * Math.round(creatureFrames),
      0,
      16,
      20,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }

  update() {
    this.draw();

    if (creatureMovingDirection === "left") {
      this.position.x -= 2;
    } else if (creatureMovingDirection === "right") {
      this.position.x += 2;
    }
    creatureFrames += 0.05;
    if (creatureFrames > 1) {
      creatureFrames = 0;
    }
  }
}

let creature = new Creature();

class Platform {
  constructor({ x, y }) {
    this.position = {
      x,
      y,
    };
    this.image = ground;
    this.width = groundWidth;
    this.height = groundHeight;
  }
  draw() {
    ctx.drawImage(
      ground,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}

class Flag {
  constructor() {
    this.position = {
      x: 4000,
      y: 230,
    };
    this.image = flag;
    this.width = 50;
    this.height = 300;
  }
  draw() {
    ctx.drawImage(
      flag,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
  update() {
    this.position.x = finishFlag.position.x;
    this.position.y = finishFlag.position.y;
    this.draw();
  }
}
let finishFlag = new Flag();

drawPlatforms();



player.update();

render();

