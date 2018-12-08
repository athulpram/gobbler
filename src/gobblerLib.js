const readline = require('readline-sync');
let gobblerStatus = {
  foodPosition : 10, 
  positionOfEater : 55,
  score : 0
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
  let {positionOfEater,foodPosition,score} = gobblerStatus;
  let grid=new Array(100).fill("   ");
  grid[positionOfEater]="{+}"
  grid[foodPosition]=" O ";
  array=createPlayground(grid);
  for(line=0;line<12;line++){
    console.log(array[line]);
  }
  printScore(score);
  positionOfEater = changeEaterPosition(positionOfEater);
  if(positionOfEater==foodPosition){
    foodPosition=generateFoodPosition();
    score += 1;
  }
  gobblerStatus = {positionOfEater,foodPosition,score};
}

const runGobbler=function(){
  setInterval(gobbler,1000);
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

const changeEaterPosition = function (positionOfEater){
  gobblerPositions = {
    "w" : function(positionOfEater){if (positionOfEater > 9) {return positionOfEater-10;} else {return positionOfEater;} },
    "s" : function(positionOfEater){if (positionOfEater < 90 ) {return positionOfEater+10;} else {return positionOfEater;} },
    "a" : function(positionOfEater){if (positionOfEater%10 != 0) {return positionOfEater-1;} else {return positionOfEater;} },
    "d" : function(positionOfEater){if ((positionOfEater+1)!= 0) {return positionOfEater+1;} else {return positionOfEater;} },
    "otherwise" : function(positionOfEater) {console.log("Sorry. Game over !"); process.exit();}
  }

  let inputForMoving = readline.question("choose your move:w,a,s,d : ");
  if( inputForMoving != 'w' && inputForMoving != 'a' && inputForMoving != 's' && inputForMoving != 'd'){
    inputForMoving = "otherwise";
  }
  return gobblerPositions[inputForMoving](positionOfEater);
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
