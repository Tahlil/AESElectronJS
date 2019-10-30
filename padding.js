function addPadding(totalHexBytes){
  var blockSizeInBytes = 16, totalSize = totalHexBytes.length;
  if (totalSize % blockSizeInBytes === 0) {
    return totalHexBytes; 
  }
  else{
    var requiredPadding = blockSizeInBytes - (totalSize % blockSizeInBytes)
    for (let index = 0; index < requiredPadding; index++) {
      totalHexBytes.push('0x00');
    }
    return totalHexBytes;
  }
}