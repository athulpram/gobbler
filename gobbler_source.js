const generateLine = function (symbol,length){
  let line = "";
  for (index = 0; index < length ; index++){
    line = line + symbol;
  }
  return line;
}

const createPlayground = function (grid){
  let playground=[];
  playground[0] = generateLine("-",30);
  for(let row=1;row<=10;row++){
    playground[row]="|";
    for(let column = (row-1)*10;column<row*10;column++){
      playground[row] += grid[column];
    }
    playground[row]+="|"
  }
  playground[11] = generateLine("-",30);
  return playground;
}

const main = function(){
  //output = generateLine('*',39);
  //console.log(output);
  let grid=Array(100).fill("   ");
  grid[92]="{+}"
  array=createPlayground(grid);
  for(line=0;line<12;line++){
    console.log(array[line]);
  }
}
main();

