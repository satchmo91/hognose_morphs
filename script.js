const gallery = document.getElementById("gallery");
const emptyGallery = document.getElementById("emptyGallery");
const sortButtons = document.querySelectorAll("button.sortButton");

import data from "./data.json" assert { type: "json"};
import Fuse from 'https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.esm.js'

const fuse = new Fuse(data.images, {
    threshold: 0.3,
    keys: ['traits']
})

const traitList = ["WILD", "ALBINO","CONDA","SUPER-CONDA","ARCTIC","SUPER-ARCTIC","AXANTHIC","CARAMEL","EXTREME RED","GRANITE","GREEN HYPO","HYPO","DUTCH HYPO","JAG","LAVENDER","LEMON GHOST","LEUSISTIC","MOCHA","PINK PASTEL","PISTACHIO","PURPLE LINE","RBE PASTEL","SABLE","SHADOW","SWISS CHOCOLATE","TIGER","TOFFEE","TWINSPOT"];
const traitFilter = [];

window.onload = (e) => {
    loadImages();

    traitList.forEach(trait => {
        let option = document.createElement("option");
        option.value = trait;
    });
}

sortButtons.forEach(button => {
    button.addEventListener('click', selectTrait)
})

function selectTrait(e) {
    let className = e.target.className
    let trait = e.target.innerHTML;

    //Activate Button
    if(className == "sortButton") {
        e.target.className ="sortButtonActive"
        traitFilter.push(trait);
        filterImages()
    //Deactivate Button
    } else {
        e.target.className = "sortButton"
        traitFilter.splice(traitFilter.indexOf(trait), 1)
        if(traitFilter.length == 0) {
            loadImages()
            return;
        } else {
            loadImages()
            filterImages()
        }
    }
}

function loadImages () {
    emptyGallery.hidden = true;

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

function filterImages() {
    if(traitFilter.length == 0){
        loadImages();
        return;
    }

    document.querySelectorAll(".imgContainer").forEach(element => {
        let remove = true
        traitFilter.forEach(trait => {
            if(data.images[element.id].traits.includes(trait)) {
                remove = false
            } else {
                remove = true
            }
        });

        if(remove) {
            element.remove();
        }
    })

    if(gallery.innerHTML == "") {
        emptyGallery.hidden = false;
    }
}
