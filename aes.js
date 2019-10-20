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
  result[colArray.length-1] = colArray[0];
  return result;
}

const subBytesKey = function(colArray) {
  result = [];
  for (i = 0; i < colArray.length; i++) {
    let j = colArray[i];
    result[i] = (metaData.sbox[j & 0x000000FF] & 0xFF);
  }
  return result;
}

const subBytesInput = function(currentState) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let hexaByte = currentState[i][j];
      currentState[i][j] = (metaData.sbox[hexaByte & 0x000000FF] & 0xFF);
    }
  }
  return currentState;
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
  console.log("First key: ");
  printHexaDecimalMatrix(firstKey);
  let finalKeys = firstKey;
  let rconIndex = 0;
  for (let i = 4; i < 4*(metaData.numberOfRound+1); i++) {
    let col = getColumn(finalKeys, i-1);
    if (i % 4 === 0) {
      col = rotateWord(col);
      col = subBytesKey(col);
      col = xorBytes(col, getColumn(finalKeys, i-4));
      col = xorRcon(col, rconIndex);
      rconIndex++;
    } else {
      col = xorBytes(col, getColumn(finalKeys, i-4));
    }
    //console.log("Iteraion: "+i);
    // printHexaDecimalArray(col);
    //console.log(finalKeys);
    finalKeys = copyColumn(finalKeys, i, col);
    //console.log(finalKeys);
  }
  printHexaDecimalMatrix(finalKeys);
  return finalKeys;
}

const shiftRows = function(currentState) {
  row = [];
  let shift = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      row[j] = currentState[i][j];
    }
    for (let j = 0; j < 4; j++) {
      currentState[i][j] = row[(j+shift) % 4];
    }
    shift++;
  }
  return currentState;
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

addRoundKey = function(currentRound, currentState, keys) {
  let col, j = 0;
  for (let i = 0; i < 4; i++) {
    col = xorBytes(getColumn(currentState, i), getColumn(keys, currentRound*4+j));
    copyColumn(currentState, i, col);
    j++;
  }
  return currentState;
}

const encrypt16BytesBlock = function(currentState, currentRound) {
  printHexaDecimalMatrix(currentState);
  currentState =  subBytesInput(currentState);
  printHexaDecimalMatrix(currentState)
  currentState = shiftRows(currentState);
  printHexaDecimalMatrix(currentState)

  //currentState = 
}

const encrypt = function(plainHexBlock, keys){
  let currentState = plainHexBlock;
  currentState = addRoundKey(0, currentState, keys);
  console.log("After round 0:");
  printHexaDecimalMatrix(currentState);
  for (let index = 1; index < metaData.numberOfRound; index++) {
    currentState = encrypt16BytesBlock(currentState, index);
    break;
  }
}

let keys;
const keyHexList = [0x54, 0x73, 0x20, 0x67, 0x68, 0x20, 0x4B, 0x20, 0x61, 0x6D, 0x75, 0x46, 0x74, 0x79, 0x6E, 0x75];
const plainHexList = [0x54, 0x4F, 0x4E, 0x20, 0x77, 0x6E, 0x69, 0x54, 0x6F, 0x65, 0x6E, 0x77, 0x20, 0x20, 0x65, 0x6F];
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
keys = generateKeys(matrixKey);
encrypt(matrixInput, keys);
//matrixKey = copyColumn(matrixKey, 4, [1,2,3,4])
//console.log(matrixKey);