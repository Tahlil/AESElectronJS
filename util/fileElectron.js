var fs = require('fs');

function getHexByteArray(filePath){
    let fileData = fs.readFileSync(filePath).toString('hex');
    let result = []
    for (var i = 0; i < fileData.length; i+=2)
      result.push('0x'+fileData[i]+''+fileData[i+1])
    return result;
}

function writeHexByteFile(byteArray, fileName, fileDirectory){
  try {
    let data = Buffer.from(byteArray, 'hex');
    fs.writeFileSync(fileDirectory+fileName, data);
  } catch(err) {
    // An error occurred
    console.error(err);
  }
}

module.exports = {
  getHexByteArray: getHexByteArray,
  writeHexByteFile: writeHexByteFile 
}