const readline = require('readline-sync');

const generateLine = function (symbol,length){
  let line = "";
  for (index = 0; index < length ; index++){
    line = line + symbol;
  }
  return line;
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
  let inputForMoving = readline.question("choose your move:w,a,s,d : ");
  if ( inputForMoving == 'w' && positionOfEater>9){
    positionOfEater = positionOfEater - 10;
  }
  else if ( inputForMoving == 's' && positionOfEater<90){
    positionOfEater = positionOfEater + 10;
  }
  else if (inputForMoving == 'a' && positionOfEater%10!=0){
    positionOfEater = positionOfEater - 1;
  }
  else if (inputForMoving == 'd' && (positionOfEater+1)%10!=0){
    positionOfEater = positionOfEater + 1;
  }else{
    console.log("Sorry dude , You are dead!!");
  }
  return positionOfEater;
}

const main = function(){
  let positionOfEater = 55 ;
  while(1){
    console.clear();
    let grid=Array(100).fill("   ");
    grid[positionOfEater]="{+}"
    array=createPlayground(grid);
    for(line=0;line<12;line++){
      console.log(array[line]);
    }
    positionOfEater = changeEaterPosition(positionOfEater);
  }
}
main();

