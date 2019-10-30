var fileToBeEncrypted, fileToBeDecrypted;
var path, name;
var doEncryption;

function showEncryptUI(elm) {
  var file = document.getElementById("myFileEn").files[0];
  path = file.path;
  name = file.name;
  console.log(path);
  console.log(document.getElementById("myFileEn").files[0]);
  ipcRenderer.send("get-bytes", {encrypt: true, path:path});
}

function showDecryptUI(elm) {
  var file = document.getElementById("myFileDe").files[0];
  path = file.path;
  name = file.name;
  console.log(path);
  console.log(document.getElementById("myFileDe").files[0]);
  ipcRenderer.send("get-bytes", {encrypt: false, path:path});

}

ipcRenderer.on("got-bytes", (event, res) => {
  console.log("Result: ");
  //console.log(res);
  res.id === "en-ui" ? fileToBeEncrypted = res.byteArray : fileToBeDecrypted = res.byteArray;
  var modalID = res.id === "en-ui" ? 'enc' : 'dec'; 
  $("#" + res.id).html(`
  <div class="container">
      <div class="row">
        <div class="col-5 offset-1">
          File to decrypt: <h3>${name}</h3>    
          <p class="badge badge-secondary">${path}</p>
        </div>
        <div class="col-3 offset-3 mt-3">
          <button class="btn btn-info p-3" data-toggle="modal" data-target="#${modalID}Modal" onClick="${res.btnName}()">${res.btnName.toUpperCase()}</button>
        </div>
      </div>
    </div>
  `)
});

function encrypt(){
  console.log("File to be encrypted: ");
  console.log(fileToBeEncrypted);
  console.log("Byte array size: " + fileToBeEncrypted.length);
  doEncryption = true;
}

function decrypt(){
  console.log("File to be decrypted: ");  
  console.log(fileToBeDecrypted);
  doEncryption = false;
}

function writeFile() {  
  var fileData = doEncryption ? fileToBeEncrypted : fileToBeDecrypted;
  console.log("Before padding number of bytes: "  + fileData.length);
  fileData = addPadding(fileData);
  console.log("After padding number of bytes: "  + fileData.length);
  fileData = fileData.map(hexStr => parseInt(hexStr, 'hex'));
  fileData = doEncryption ? encryptPaddedByBlocks(fileData) : decryptPaddedByBlocks(fileData);
  var inputId = doEncryption ? "enc" : "dec" ;
  var fileName = $('#'+inputId+'FileName').val();
  var fileDirectory = "../";
  fileName = (fileName === "" || fileName === undefined) ? "default" : fileName;
  //console.log("File name: " +  fileName);
  ipcRenderer.send("file-write", {fileName: fileName, fileDirectory: fileDirectory, fileData: fileData});  
}

ipcRenderer.on("file-written", (event, res) => {
  var labalId = doEncryption ? "enc-success" : "dec-success";
  var label = doEncryption ? "Encryption" : "Decryption";
  $("#" + labalId).html(`
    <h5 class="badge badge-success" >
      ${label} Successful
    </h5>
  `);
});