if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

let db;
let request = window.indexedDB.open("AppDB", 1);

request.onerror = function(event) {
   console.log("error: ");
};

request.onsuccess = function(event) {
   db = request.result;
   console.log("success: "+ db);
};

request.onupgradeneeded = function(event) {
  let db = event.target.result;
  db.createObjectStore("TestApp", {keyPath: "id"});
}

function saveData(id, data) {
  let request = db.transaction(["TestApp"], "readwrite").objectStore("TestApp").put({ id: id, data});
  
  request.onsuccess = function(event) {
    console.log("Data Saved in DB for "+id);
  };
  
  request.onerror = function(event) {
  console.log("Unable to Save Data for"+id);
  }
}

export {saveData};