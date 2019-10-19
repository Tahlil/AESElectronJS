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

const copyColumn = function(mat, pos, col) {
  for (i = 0; i < col.length; i++) {
    mat[i][pos] = col[i];
  }
  return mat;
}

const getColumn = function(matrix, pos) {
  result = [];
  for (i = 0; i < 4; i++)
    result[i] = matrix[i][pos];
  return result;
}

const rotateWord = function(colArray) {
  let result = [];
  for (i = 0; i < colArray.length-1; i++)
    result[i] = colArray[i+1];
  result[result.length-1] = colArray[0];
  return result;
}

const subBytesKey = function(colArray) {
  result = [];
  for (i = 0; i < colArray.length; i++) {
    let j = arr[i];
    result[i] = (metaData.sbox[j & 0x000000FF] & 0xFF);
  }
  return result;
}

const xorBytes = function(bytes1, bytes2) {
  let result = [];
  for (i = 0; i < bytes1.length; i++)
    result[i] = (bytes1[i] ^ bytes2[i]);
  return result;
}

const xorRcon = function(colArray, index) {
  colArray[0] = (colArray[0] ^ (metaData.rcon[0][index] & 0xff));
  return colArray;
}

const generateKeys = function(firstKey) {
  let finalKeys = [];

}

const printHexaDecimalArray = function (hexArray) { 
  for (let j = 0; j < hexArray.length; j++) {
    process.stdout.write(hexArray[j].toString(16) + " ");
  }
  console.log("");
}

const printHexaDecimalMatrix = function(hexMatrix){
  for (let i = 0; i < hexMatrix.length; i++) {
    printHexaDecimalArray(hexMatrix[i]); 
  }
}

addRoundKey = function(currentRound) {
  // byte[] col;
  // int j = 0;
  // for (int i = 0; i < 4; i++) {
  //   col = xorBytes(getColumn(state, i), getColumn(keys, currentRound*4+j));
  //   columnCopy(state, i, col);
  //   j++;
  // }
}

let keys;
const keyHexList = [0x54, 0x68, 0x61, 0x74, 0x73, 0x20, 0x6D, 0x79, 0x20, 0x4B, 0x75, 0x6E, 0x67, 0x20, 0x46, 0x750];
const plainHexList = [0x54, 0x77, 0x6F, 0x20, 0x4F, 0x6E, 0x65, 0x20, 0x4E, 0x69, 0x6E, 0x65, 0x20, 0x54, 0x77, 0x6F];
console.log("Test input:");
printHexaDecimalArray(plainHexList);
console.log("Test key:");
printHexaDecimalArray(keyHexList);

let matrixKey = createStateMatrix(keyHexList);
let matrixInput = createStateMatrix(plainHexList);

console.log("Test 1st key:");
printHexaDecimalMatrix(matrixKey);
console.log("Test input:");
printHexaDecimalMatrix(matrixInput);


//matrixKey = copyColumn(matrixKey, 4, [1,2,3,4])
//console.log(matrixKey);