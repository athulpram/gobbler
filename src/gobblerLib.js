const readline = require("readline");
let gobblerStatus = {
  foodPosition: 10,
  positionOfEater: 55,
  score: 0,
  inputForMoving: "up",
  speed: 800,
  newSpeed: 800
};

const generateLine = function(symbol, length) {
  let line = "";
  for (index = 0; index < length; index++) {
    line = line + symbol;
  }
  return line;
};

const gobbler = function() {
  console.clear();
  increaseGobblerSpeed();
  changeEaterPosition(gobblerStatus.inputForMoving);
  let { positionOfEater, foodPosition, score } = gobblerStatus;
  let grid = new Array(100).fill("   ");
  grid[foodPosition] = " O ";
  grid[positionOfEater] = "{+}";
  array = createPlayground(grid);
  for (line = 0; line < 12; line++) {
    console.log(array[line]);
  }
  printScore(score);
  if (positionOfEater == foodPosition) {
    foodPosition = generateFoodPosition();
    score += 1;
  }
  gobblerStatus.foodPosition = foodPosition;
  gobblerStatus.score = score;
};

const increaseGobblerSpeed = function() {
  // let factor = Math.floor(gobblerStatus.score / 3);
  // gobblerStatus.newSpeed = gobblerStatus.speed - factor * 100;
  gobblerStatus.newSpeed = 800 - Math.floor(gobblerStatus.score / 5) * 100;
};

const runGobbler = function() {
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on("keypress", changeMovingInput);
  startInterval();
};

const startInterval = function() {
  let ref = setInterval(() => {
    gobbler();
    if (gobblerStatus.newSpeed < gobblerStatus.speed) {
      clearInterval(ref);
      if (gobblerStatus.newSpeed < 0) {
        gobblerStatus.newSpeed = 100;
      }
      gobblerStatus.speed = gobblerStatus.newSpeed;
      startInterval();
    }
  }, gobblerStatus.speed);
};

const changeMovingInput = function(stringInput, key) {
  gobblerStatus.inputForMoving = key.name;
};

const createPlayground = function(grid) {
  let playground = [];
  playground[0] = generateLine("-", 32);
  for (let row = 1; row <= 10; row++) {
    playground[row] = "|";
    for (let column = (row - 1) * 10; column < row * 10; column++) {
      playground[row] += grid[column];
    }
    playground[row] += "|";
  }
  playground[11] = generateLine("-", 32);
  return playground;
};

const moveUp = function(positionOfEater) {
  if (positionOfEater > 9) {
    return positionOfEater - 10;
  }
  gameOver();
};

const moveLeft = function(positionOfEater) {
  if (positionOfEater % 10 != 0) {
    return positionOfEater - 1;
  }
  gameOver();
};

const moveRight = function(positionOfEater) {
  if ((positionOfEater + 1) % 10 != 0) {
    return positionOfEater + 1;
  }
  gameOver();
};

const moveDown = function(positionOfEater) {
  if (positionOfEater < 90) {
    return positionOfEater + 10;
  }
  gameOver();
};

const gameOver = function() {
  console.log("Sorry Game Over \n Your Score is ", gobblerStatus.score);
  process.exit();
};

const changeEaterPosition = function(inputForMoving) {
  let positionOfEater = gobblerStatus.positionOfEater;
  gobblerPositions = {
    up: moveUp,
    down: moveDown,
    left: moveLeft,
    right: moveRight
  };

  if (
    inputForMoving != "up" &&
    inputForMoving != "left" &&
    inputForMoving != "down" &&
    inputForMoving != "right"
  ) {
    inputForMoving = gobblerStatus.inputForMoving;
  }
  gobblerStatus.inputForMoving = inputForMoving;
  gobblerStatus.positionOfEater = gobblerPositions[
    gobblerStatus.inputForMoving
  ](positionOfEater);
};

const generateFoodPosition = function() {
  foodPosition = Math.floor(Math.random() * 100);
  return foodPosition;
};

const printScore = function(score) {
  console.log("Your score is =", score, "!");
};

module.exports = {
  printScore,
  generateFoodPosition,
  changeEaterPosition,
  createPlayground,
  generateLine,
  runGobbler
};
