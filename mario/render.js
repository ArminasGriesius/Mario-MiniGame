function resetElements() {
  document.getElementById("startMario").style.display = "none";
  marioTheme.currentTime = 0;
  setTimeout(() => {
    marioTheme.play();
  }, 1500);
  platforms.length = 0;
  pyramid.length = 0;

  drawPlatforms();
  addEventListener("keydown", handleKeyDown);
addEventListener("keyup", handleKeyUp);
}

function resetPositions() {
  movingDirection = "right";
  frames = 0;
  player.position.x = 100;
  player.position.y = 350;
  creature.position.x = 3900;
  finishFlag.position.x = 4000;
}

function initMario() {
  resetElements();
  resetPositions();
}

function drawAirPlatforms() {
  for (let i = 0; i < airPlatformCount; i++) {
    const x = (5 + i) * (groundWidth - 2);
    platforms.push(new Platform({ x, y: 200, image: ground }));
    platforms.push(
      new Platform({ x: (30 + i) * (groundWidth - 2), y: 350, image: ground })
    );
  }
}

function drawGroundPlatforms() {
  for (let i = -1; i < platformCount; i++) {
    const x = i * (groundWidth - 2);
    platforms.push(new Platform({ x, y: 530, image: ground }));
    platforms.push(
      new Platform({ x: (i + 55) * (groundWidth - 2), y: 530, image: ground })
    );
  }
}

function drawObstaclePlatforms() {
  for (let level = 0; level < 2; level++) {
    for (let i = 0; i < 2 - level; i++) {
      const x1 = (52.9 + i) * (groundWidth - 1);
      const x2 = (48 - i) * (groundWidth - 1);
      const y = 482 - level * 48;
      platforms.push(new Platform({ x: x1, y, image: ground }));
      platforms.push(new Platform({ x: 1300, y, image: ground }));
      platforms.push(new Platform({ x: x2, y, image: ground }));
    }
  }
}

function makePyramid(number) {
  initMario();
  if (number <= 6) {
    pyramid.length = 0;
    for (let level = 0; level < number; level++) {
      addBlock.play();

      for (let i = 0; i < number - level; i++) {
        const x1 = (12.5 + i) * (groundWidth - 1);
        const x2 = (12.5 - i) * (groundWidth - 1);
        const y = 482 - level * 48;
        pyramid.push(new Platform({ x: x1, y, image: ground }));
        pyramid.push(new Platform({ x: x2, y, image: ground }));
      }
    }
  } else return;
}

function drawPlatforms() {
  drawGroundPlatforms();
  drawObstaclePlatforms();
  drawAirPlatforms();
}

function render() {
  requestAnimationFrame(render);
  ctx.fillStyle = "lightblue";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  platforms.forEach((platform) => {
    platform.draw();
  });
  pyramid.forEach((block) => {
    block.draw();
  });

  player.update();
  creature.update();
  finishFlag.update();

  const { playerHitPlatform, playerHitPyramidBlock } =
    checkBackgroundMoveCollisions();

  if (playerHitPlatform || playerHitPyramidBlock) {
    colision = true;
  } else {
    colision = false;
  }

  function checkRunLimits() {
    if (player.position.x === 405) {
      rightRunLimit = true;
    } else if (!keys.right.pressed) {
      rightRunLimit = false;
    }
    if (player.position.x === 50) {
      leftRunLimit = true;
    } else if (!keys.left.pressed) {
      leftRunLimit = false;
    }
  }
  checkRunLimits();

  function changeMarioFrames() {
    if (keys.right.pressed) {
      frames += 0.2;
      if (frames > 2) {
        frames = 0;
      }
    }
    if (keys.left.pressed) {
      frames += 0.2;
      if (frames > 2) {
        frames = 0;
      }
    }
  }
  changeMarioFrames();

  function marioMovement() {
    if (keys.right.pressed && player.position.x <= 400) {
      player.velocity.x = 5;
    } else if (keys.left.pressed && player.position.x > 50) {
      player.velocity.x = -5;
    } else {
      player.velocity.x = 0;
    }
  }
  marioMovement();

  checkMarioFlagColision();

  creatureFlagColision();

  function creatureAndFlagScroll() {
    if (keys.right.pressed && rightRunLimit && !colision) {
      finishFlag.position.x -= 5;
      creature.position.x -= 5;
    }
    if (keys.left.pressed && leftRunLimit && !colision) {
      finishFlag.position.x += 5;
      creature.position.x += 5;
    }
  }
  creatureAndFlagScroll();

  marioAndCreatureColision();

  platformsColisionAndScroll();
  pyramidColisionAndScroll();
}
