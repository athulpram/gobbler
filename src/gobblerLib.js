const readline = require('readline');
let gobblerStatus = {
  foodPosition : 10, 
  positionOfEater : 55,
  score : 0,
  inputForMoving : "w"
}
const generateLine = function (symbol,length){
  let line = "";
  for (index = 0; index < length ; index++){
    line = line + symbol;
  }
  return line;
}

const gobbler = function(){
  console.clear();
  console.log(gobblerStatus.inputForMoving);
  changeEaterPosition(gobblerStatus.inputForMoving);
  let {positionOfEater,foodPosition,score} = gobblerStatus;
  let grid=new Array(100).fill("   ");
  grid[positionOfEater]="{+}"
  grid[foodPosition]=" O ";
  array=createPlayground(grid);
  for(line=0;line<12;line++){
    console.log(array[line]);
  }
  printScore(score);
  if(positionOfEater==foodPosition){
    foodPosition=generateFoodPosition();
    score += 1;
  }
  console.log('end');
  console.log(gobblerStatus.inputForMoving);
  gobblerStatus.foodPosition = foodPosition;
  gobblerStatus.score = score;
}

const runGobbler=function(){
  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);
  process.stdin.on('keypress',changeEaterPosition);
  setInterval(gobbler,100);
}

const createPlayground = function (grid){
  let playground=[];
  playground[0] = generateLine("-",32);
  for(let row=1;row<=10;row++){
    playground[row]="|";
    for(let column = (row-1)*10;column<row*10;column++){
      playground[row] += grid[column];
    }
    playground[row]+="|"
  }
  playground[11] = generateLine("-",32);
  return playground;
}

const changeEaterPosition = function (inputForMoving){
  let positionOfEater = gobblerStatus.positionOfEater;
  gobblerPositions = {
    "w" : function(positionOfEater){if (positionOfEater > 9) {return positionOfEater-10;} else {return positionOfEater;} },
    "s" : function(positionOfEater){if (positionOfEater < 90 ) {return positionOfEater+10;} else {return positionOfEater;} },
    "a" : function(positionOfEater){if (positionOfEater%10 != 0) {return positionOfEater-1;} else {return positionOfEater;} },
    "d" : function(positionOfEater){if ((positionOfEater+1)!= 0) {return positionOfEater+1;} else {return positionOfEater;} },
    "otherwise" : function(positionOfEater) {console.log("Sorry. Game over !"); process.exit();}
  }

  if( inputForMoving != 'w' && inputForMoving != 'a' && inputForMoving != 's' && inputForMoving != 'd'){
    inputForMoving = gobblerStatus.inputForMoving;
  }
  gobblerStatus.inputForMoving = inputForMoving;
  gobblerStatus.positionOfEater= gobblerPositions[gobblerStatus.inputForMoving](positionOfEater);
}

const generateFoodPosition = function(){
  foodPosition = Math.floor(Math.random()*100);
  return foodPosition;
}

const printScore = function(score){
  console.log("Your score is =",score,"!");
}

module.exports = {
  printScore,
  generateFoodPosition,
  changeEaterPosition,
  createPlayground,
  generateLine,
  runGobbler
}
