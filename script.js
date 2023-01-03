const textBox = document.getElementById("textBox");
const gallery = document.getElementById("gallery");
const suggestions = document.getElementById("suggestions");

import data from "./data.json" assert { type: "json"};

const traitList = ["WILD", "ALBINO","CONDA","SUPER-CONDA","ARCTIC","SUPER-ARCTIC","AXANTHIC","CARAMEL","EXTREME RED","GRANITE","GREEN HYPO","HYPO","DUTCH HYPO","JAG","LAVENDER","LEMON GHOST","LEUSISTIC","MOCHA","PINK PASTEL","PISTACHIO","PURPLE LINE","RBE PASTEL","SABLE","SHADOW","SWISS CHOCOLATE","TIGER","TOFFEE","TWINSPOT"];

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
    overlayDiv.innerHTML = "Credit: " + image.overlay

    let topOverlayDiv = document.createElement("div");
    topOverlayDiv.className = "topOverlay";
    topOverlayDiv.innerHTML = image.traits;

    containerDiv.appendChild(img);
    containerDiv.appendChild(topOverlayDiv);
    containerDiv.appendChild(overlayDiv);
    gallery.appendChild(containerDiv);
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
    let searchText = textBox.value.toUpperCase();

    if(searchText === "") {
        resetImages();
        return;
    }

    data.images.forEach(image => {
        let id = image.id;
        for (let index = 0; index < image.traits.length; index++) {
            if(image.traits[index].toUpperCase().includes(searchText)){
                break;
            } else {
                if(document.getElementById(id)){
                    document.getElementById(id).remove();
                }
            }
            
        }
    });
}

