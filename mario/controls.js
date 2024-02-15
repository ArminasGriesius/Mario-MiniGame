function handleKeyDown({ key }) {
  switch (key) {
    case "a":
    case "A":
      keys.left.pressed = true;
      isMovingRight = false;
      isMovingLeft = true;
      if (!keys.right.pressed) {
        movingDirection = "left";
      }
      break;

    case "d":
    case "D":
      keys.right.pressed = true;
      isMovingRight = true;
      isMovingLeft = false;
      movingDirection = "right";
      break;
    case "w":
    case "W":
      if (player.velocity.y == 0 && !isJumping) {
        marioJump.play();
        player.velocity.y -= 15;
        isJumping = true;
      }
      break;
  }
}

function handleKeyUp({ key }) {
  switch (key) {
    case "a":
    case "A":
      keys.left.pressed = false;
      frames = 2;
      if (keys.right.pressed) {
        movingDirection = "right";
      }
      break;

    case "d":
    case "D":
      frames = 0;
      keys.right.pressed = false;
      if (keys.left.pressed) {
        movingDirection = "left";
      }
      player.velocity.x = 0;
      break;
    case "w":
    case "W":
      isJumping = false;
      break;
  }
}
