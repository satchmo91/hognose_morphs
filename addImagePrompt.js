
// Requiring fs module
import { readFileSync, writeFile } from "fs";
import fs from "fs";

import promptSync from 'prompt-sync'; 
import { isAsyncFunction } from "util/types";
const prompt = promptSync(); 
  
// Storing the JSON format data in parsedData
var data = readFileSync("data.json");
var parsedData = JSON.parse(data);

let index = 0

//parse data from JSON file, if any
if(!parsedData.images.length) {
  index = 1
} else {
  index = parseInt(parsedData.images[parsedData.images.length - 1].id) + 1;
}

//Create the elements to populate the JSON *OLD PROMPT VERSION*
function addImage(id, src, credit, overlay, traits) {
  
  function addTrait(traits){
    
    function checkProceed(){
    if(proceed == "y") {
        addTrait(traits);
      } else if (proceed === "n") {
        return;
      } else {
        proceed = prompt("Invalid response. Add another trait? y/n ")
        checkProceed();
      }
    }
    
    traits.push(prompt("Trait: "));
    
    let proceed = prompt("Add another trait? y/n ");
    checkProceed()
  }
  
  this.id = index;
  index++
  this.src = prompt("Filename: ");
  this.credit = prompt("Img Credit: ");
  this.overlay = prompt("Overlay Text: ");
  this.traits = [];
  addTrait(this.traits);

}

function addNewImage() {

  console.log("\n   /--------------------/\n  /xxxxxxxxxxxxxxxxxxxx/\n /--------------------/\n")

  let image = new addImage();
  // Adding the new data to our object
  parsedData.images.push(image);

  function checkProceed(){
    if(proceed == "y") {
        addNewImage();
      } else if (proceed === "n") {
        sumbitImages();
      } else {
        proceed = prompt("Invalid response. Add new image? y/n ")
        checkProceed();
      }
    }
  let proceed = prompt("Would you like to add a new image? y/n ");
  checkProceed();
}


//Write the JSON file
function sumbitImages() {
  // // Writing to our JSON file
  var newData2 = JSON.stringify(parsedData);
  writeFile("data.json", newData2, (err) => {
    // Error checking
    if (err) throw err;
    console.log("New data added");
  });
}

addNewImage()

fs.readdir("./img",  (err, files) => {
  
  files.forEach(file => {
    //id
    console.log("id: " + files.indexOf(file))
    //Filename
    console.log("filename: "+ file);
    //Credit
    console.log("Credit : " + file.slice(file.indexOf("_") + 1, file.indexOf(".")))
    //Traits
    let array = file.split(",");
    let index = array.length - 1;
    array.splice(index, 1)
    console.log("Traits: " + array);
  });
})
