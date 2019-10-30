function showEncryptUI(elm) {
  var file = document.getElementById("myFileEn").files[0];
  var path = file.path;
  var name = file.name;
  console.log(path);
  console.log(document.getElementById("myFileEn").files[0]);
  $("#en-ui").html(`
  <div class="container">
      <div class="row">
        <div class="col-5 offset-1">
          File to encrypt: <h3>${name}</h3>    
          <p class="badge badge-secondary">${path}</p>
        </div>
        <div class="col-3 offset-3 mt-3">
          <button class="btn btn-info p-3" onClick="encrypt()">Encrypt</button>
        </div>
      </div>
    </div>
  `)
}

function showDecryptUI(elm) {
  var file = document.getElementById("myFileDe").files[0];
  var path = file.path;
  var name = file.name;
  console.log(path);
  console.log(document.getElementById("myFileDe").files[0]);
  $("#de-ui").html(`
  <div class="container">
      <div class="row">
        <div class="col-5 offset-1">
          File to decrypt: <h3>${name}</h3>    
          <p class="badge badge-secondary">${path}</p>
        </div>
        <div class="col-3 offset-3 mt-3">
          <button class="btn btn-info p-3" onClick="decrypt()">Decrypt</button>
        </div>
      </div>
    </div>
  `)
}