const textBox = document.getElementById("textBox");
const gallery = document.getElementById("gallery");
const suggestions = document.getElementById("suggestions");

import data from "./data.json" assert { type: "json"};
import {Fuse} from "./node_modules/fuse.js/dist/fuse.js";

const traitList = ["Wild", "Albino","Conda","Super-Conda","Arctic","Super-Arctic","Axanthic","Caramel","Extreme Red","Granite","Green Hypo","Hypo","Dutch Hypo","Jag","Lavender","Lemon Ghost","Leucistic","Mocha","Pink Pastel","Pistachio","Purple Line","RBE Pastel","Sable","Shadow","Swiss Chocolate","Tiger","Toffee","Twinspot"];

window.onload = (e) => {
    loadImages();

    traitList.forEach(trait => {
        let option = document.createElement("option");
        option.value = trait;
        suggestions.appendChild(option);
    });
}

textBox.addEventListener("keyup", (e) => {
    if(e.key == "Enter") {
        console.log("test");
    }

    if (e.key == "Backspace") {
        resetImages();
        searchForImage();
    }
});

textBox.addEventListener("keyup", (e) => searchForImage());

function loadImages () {

    data.images.forEach(image => {

    let containerDiv = document.createElement("div");
    containerDiv.className = "imgContainer";
    containerDiv.id = image.id;
        
    let img = document.createElement("img");
    img.src= "./img/" + image.src;
    img.className = "img";

    let overlayDiv = document.createElement("div");
    overlayDiv.className = "overlay";
    overlayDiv.innerHTML = image.overlay

    let topOverlayDiv = document.createElement("div");
    topOverlayDiv.className = "topOverlay";
    topOverlayDiv.innerHTML = image.traits;

    let aTag = document.createElement("a");
    aTag.href = img.src;

    aTag.appendChild(img);
    containerDiv.appendChild(aTag);
    containerDiv.appendChild(topOverlayDiv);
    containerDiv.appendChild(overlayDiv);
    gallery.appendChild(containerDiv);
        console.log("TEST")
    });
}

function resetImages() {
    let parent = document.getElementById("gallery");
    
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }

    loadImages();
}

function searchForImage() {
    let searchText = textBox.value;

    if(searchText === "") {
        resetImages();
        return;
    }

    data.images.forEach(image => {
        let id = image.id;
        for (let index = 0; index < image.traits.length; index++) {
            if(image.traits[index].includes(searchText)){
                break;
            } else {
                if(document.getElementById(id)){
                    document.getElementById(id).remove();
                }
            }
            
        }
    });
}

