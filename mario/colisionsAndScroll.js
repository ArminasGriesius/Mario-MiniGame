function checkBackgroundMoveCollisions() {
  let playerHitPlatform = false;
  let playerHitPyramidBlock = false;

  platforms.forEach((platform) => {
    if (
      player.position.x + player.width >= platform.position.x &&
      player.position.x <= platform.position.x + platform.width &&
      player.position.y + player.height >= platform.position.y &&
      player.position.y <= platform.position.y + platform.height
    ) {
      playerHitPlatform = true;
    }
  });

  pyramid.forEach((block) => {
    if (
      player.position.x + player.width >= block.position.x &&
      player.position.x <= block.position.x + block.width &&
      player.position.y + player.height >= block.position.y &&
      player.position.y <= block.position.y + block.height
    ) {
      playerHitPyramidBlock = true;
    }
  });

  return { playerHitPlatform, playerHitPyramidBlock };
}

function checkMarioFlagColision() {
  if (player.position.x === finishFlag.position.x - 10) {
    console.log("win");
    marioWin.play();
    marioTheme.pause();
    initMario();
    rightRunLimit = false;
  }
}

function creatureFlagColision() {
  if (creature.position.x + creature.width == finishFlag.position.x + 20) {
    creatureMovingDirection = "left";
  }
}

function marioAndCreatureColision() {
  if (
    player.position.x <= creature.position.x + creature.width - 20 &&
    player.position.x + player.width - 20 >= creature.position.x &&
    player.position.y + player.height >= creature.position.y
  ) {
    initMario();
    marioDeath.play();
  }
}

function platformMarioTopColision() {
  if (
    player.position.y + player.height <= platform.position.y &&
    player.position.y + player.height + player.velocity.y >=
      platform.position.y &&
    player.position.x + player.width >= platform.position.x &&
    player.position.x <= platform.position.x + platform.width
  ) {
    player.velocity.y = 0;
  }
}

function platformColisionAndScroll() {
  platforms.forEach((platform) => {
    function platformMarioTopColision() {
      if (
        player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >=
          platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width
      ) {
        player.velocity.y = 0;
      }
    }
    platformMarioTopColision();

    function platformMarioBottomColision() {
      if (
        player.position.y >= platform.position.y + platform.height &&
        player.position.y + player.velocity.y <=
          platform.position.y + platform.height &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width
      ) {
        player.position.y = platform.position.y + platform.height;
        player.velocity.y = 0;
      }
    }
    platformMarioBottomColision();

    function platformScroll() {
      if (keys.right.pressed && rightRunLimit && !colision) {
        platform.position.x -= 5;
      }
      if (keys.left.pressed && leftRunLimit && !colision) {
        platform.position.x += 5;
      }
    }
    platformScroll();

    function platformMarioSidesColision() {
      if (
        (player.position.x + player.width <= platform.position.x &&
          player.position.x + player.width + player.velocity.x >=
            platform.position.x &&
          player.position.y + player.height >= platform.position.y &&
          player.position.y <= platform.position.y + platform.height) ||
        (player.position.x >= platform.position.x + platform.width &&
          player.position.x + player.velocity.x <=
            platform.position.x + platform.width &&
          player.position.y + player.height >= platform.position.y &&
          player.position.y <= platform.position.y + platform.height)
      ) {
        player.velocity.x = 0;
      }
    }
    platformMarioSidesColision();

    function platformCreatureColision() {
      if (
        creature.position.x + creature.velocity.x <=
          platform.position.x + platform.width + platform.width &&
        creature.position.y >= platform.position.y
      ) {
        creatureMovingDirection = "right";
      }
    }
    platformCreatureColision();
  });
}

function platformsColisionAndScroll() {
  platforms.forEach((platform) => {
    function platformMarioTopColision() {
      if (
        player.position.y + player.height <= platform.position.y &&
        player.position.y + player.height + player.velocity.y >=
          platform.position.y &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width
      ) {
        player.velocity.y = 0;
      }
    }
    platformMarioTopColision();

    function platformMarioBottomColision() {
      if (
        player.position.y >= platform.position.y + platform.height &&
        player.position.y + player.velocity.y <=
          platform.position.y + platform.height &&
        player.position.x + player.width >= platform.position.x &&
        player.position.x <= platform.position.x + platform.width
      ) {
        player.position.y = platform.position.y + platform.height;
        player.velocity.y = 0;
      }
    }
    platformMarioBottomColision();

    function platformScroll() {
      if (keys.right.pressed && rightRunLimit && !colision) {
        platform.position.x -= 5;
      }
      if (keys.left.pressed && leftRunLimit && !colision) {
        platform.position.x += 5;
      }
    }
    platformScroll();

    function platformMarioSidesColision() {
      if (
        (player.position.x + player.width <= platform.position.x &&
          player.position.x + player.width + player.velocity.x >=
            platform.position.x &&
          player.position.y + player.height >= platform.position.y &&
          player.position.y <= platform.position.y + platform.height) ||
        (player.position.x >= platform.position.x + platform.width &&
          player.position.x + player.velocity.x <=
            platform.position.x + platform.width &&
          player.position.y + player.height >= platform.position.y &&
          player.position.y <= platform.position.y + platform.height)
      ) {
        player.velocity.x = 0;
      }
    }
    platformMarioSidesColision();

    function platformCreatureColision() {
      if (
        creature.position.x + creature.velocity.x <=
          platform.position.x + platform.width + platform.width &&
        creature.position.y >= platform.position.y
      ) {
        creatureMovingDirection = "right";
      }
    }
    platformCreatureColision();
  });
}

function pyramidColisionAndScroll() {
  pyramid.forEach((block) => {
    function pyramidMarioTopColision() {
      if (
        player.position.y + player.height <= block.position.y &&
        player.position.y + player.height + player.velocity.y >=
          block.position.y &&
        player.position.x + player.width >= block.position.x &&
        player.position.x <= block.position.x + block.width
      ) {
        player.velocity.y = 0;
      }
    }
    pyramidMarioTopColision();

    function pyramidScroll() {
      if (keys.right.pressed && rightRunLimit && !colision) {
        block.position.x -= 5;
      }
      if (keys.left.pressed && leftRunLimit && !colision) {
        block.position.x += 5;
      }
    }
    pyramidScroll();

    function pyramidMarioSidesColision() {
      if (
        (player.position.x + player.width <= block.position.x &&
          player.position.x + player.width + player.velocity.x >=
            block.position.x &&
          player.position.y + player.height >= block.position.y &&
          player.position.y <= block.position.y + block.height) ||
        (player.position.x >= block.position.x + block.width &&
          player.position.x + player.velocity.x <=
            block.position.x + block.width &&
          player.position.y + player.height >= block.position.y &&
          player.position.y <= block.position.y + block.height)
      ) {
        player.velocity.x = 0;
      }
    }
    pyramidMarioSidesColision();
  });
}
