const {
  printScore,
  generateFoodPosition,
  changeEaterPosition,
  createPlayground,
  generateLine
}=require("./src/gobblerLib.js");

const main = function(){
  let positionOfEater = 55 ;
  let foodPosition = generateFoodPosition();
  let score = 0;
  while(1){
    console.clear();
    let grid=Array(100).fill("   ");
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
  }
}
main();

