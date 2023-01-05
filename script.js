const textBox = document.getElementById("textBox");
const gallery = document.getElementById("gallery");
const searchButton = document.getElementById("searchButton");
const resetButton = document.getElementById("resetButton");
const emptyGallery = document.getElementById("emptyGallery");

import data from "./data.json" assert { type: "json"};
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.esm.js'

const fuse = new Fuse(data.images, {
    threshold: 0.3,
    keys: ['traits']
})

const traitList = ["WILD", "ALBINO","CONDA","SUPER-CONDA","ARCTIC","SUPER-ARCTIC","AXANTHIC","CARAMEL","EXTREME RED","GRANITE","GREEN HYPO","HYPO","DUTCH HYPO","JAG","LAVENDER","LEMON GHOST","LEUSISTIC","MOCHA","PINK PASTEL","PISTACHIO","PURPLE LINE","RBE PASTEL","SABLE","SHADOW","SWISS CHOCOLATE","TIGER","TOFFEE","TWINSPOT"];

searchButton.addEventListener("click", () => searchForImage(textBox.value));
resetButton.addEventListener("click", loadImages);


window.onload = (e) => {
    loadImages();

    traitList.forEach(trait => {
        let option = document.createElement("option");
        option.value = trait;
    });
}

textBox.addEventListener("keyup", (e) => {
    if(e.key == "Enter") {
        searchForImage(textBox.value)
    }
});


function loadImages () {
    emptyGallery.hidden = true;

    textBox.value = ""

    gallery.innerHTML = '';

    data.images.forEach(image => {

    let a = document.createElement("a");
    a.href = "./img/" + image.src;
    a.setAttribute("data-lightbox", "test")
    a.setAttribute("data-title", image.traits);

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

    a.appendChild(img)
    containerDiv.appendChild(a);
    containerDiv.appendChild(topOverlayDiv);
    containerDiv.appendChild(overlayDiv);
    gallery.appendChild(containerDiv);
    });
}

function searchForImage(value) {
    if(value == ""){
        return;
    }

    let resultsArray=[];
    let searchResults = fuse.search(value);
    searchResults.forEach(result => {
        resultsArray.push(result.item.id);
    })

    document.querySelectorAll(".imgContainer").forEach(element => {
        if(!resultsArray.includes(parseInt(element.id))) {
            document.getElementById(element.id).remove();
        }
    })

    if(gallery.innerHTML == "") {
        emptyGallery.hidden = false;
    }

    textBox.value = "";
}
