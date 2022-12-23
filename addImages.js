
// Requiring fs module
import { readFileSync, writeFile } from "fs";
import fs from "fs";

let data = {
  "images" : []
}

//Create the elements to populate the JSON
function addImage(id, src, credit, overlay, traits) {
  this.id = id;
  this.src = src;
  this.credit = credit;
  this.overlay = overlay;
  this.traits = traits;
  return this
}

function populateJSON() {
  fs.readdir("./img",  (err, files) => {
    files.forEach(file => {
      //id
      let id = files.indexOf(file)
      //Filename
      let src = file;
      //Credit
      let overlay;
      let credit = overlay = file.slice(file.indexOf("_") + 1, file.indexOf("."))
      //Traits
      let traits = file.split(",");
      let index = traits.length - 1;
      traits.splice(index, 1)
      
      data.images.push(new addImage(id, src, credit, overlay, traits));
    });
    sumbitImages(data)
  })
}

//Write the JSON file
function sumbitImages(data) {
  // // Writing to our JSON file
  var newData2 = JSON.stringify(data);
  writeFile("data.json", newData2, (err) => {
    // Error checking
    if (err) throw err;
    console.log("New data added");
  });
}

function run() {
  populateJSON();
}

run();