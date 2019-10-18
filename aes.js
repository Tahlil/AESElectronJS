const metaData = require('./data/metaAES');

const createStateMatrix = function(hexList) {
  if(hexList.length !== 16) console.error("Input size is wrong");
  let matrix = [[], [], [], []], indexRow=0, indexColumn=0;
  for (let index = 0; index < hexList.length; index++) {
    matrix[indexRow][indexColumn] = hexList[index];
    indexColumn++;
    if(indexColumn%4 === 0 ){
      indexRow++;
      indexColumn = 0;
    }
  }
  return matrix;
}

const keyHexList = [0x54, 0x68, 0x61, 0x74, 0x73, 0x20, 0x6D, 0x79, 0x20, 0x4B, 0x75, 0x6E, 0x67, 0x20, 0x46, 0x75];
const plainHexList = [0x54, 0x77, 0x6F, 0x20, 0x4F, 0x6E, 0x65, 0x20, 0x4E, 0x69, 0x6E, 0x65, 0x20, 0x54, 0x77, 0x6F];
console.log("Test input:");
console.log(plainHexList);
console.log("Test key:");
console.log(keyHexList);
let matrixKey = createStateMatrix(keyHexList);
let matrixInput = createStateMatrix(plainHexList);
console.log("Test key:");
console.log(matrixKey);
console.log("Test input:");
console.log(matrixInput);
