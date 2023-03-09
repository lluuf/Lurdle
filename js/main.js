const elementh = document.querySelector('#sliderh')
const elementw = document.querySelector('#sliderw')
const texth = document.querySelector('#texth')
const textw = document.querySelector('#textw')

var posh = elementh.getBoundingClientRect();
var posw = elementw.getBoundingClientRect();
var hWidth = posh.right-posh.left
var wWidth = posw.right-posw.left
var Stepsh = hWidth / 8
var Stepsw = wWidth / 5

elementh.addEventListener("mousedown", () => {
    posh = elementh.getBoundingClientRect();
    elementh.addEventListener("mousemove", handleEventh);
})
    
elementh.addEventListener("mouseup", () => {
    posh = elementh.getBoundingClientRect();
    elementh.removeEventListener("mousemove", handleEventh);
})

elementw.addEventListener("mousedown", () => {
    posw = elementw.getBoundingClientRect();
    elementw.addEventListener("mousemove", handleEventw);
})
    
elementw.addEventListener("mouseup", () => {
    posw = elementw.getBoundingClientRect();
    elementw.removeEventListener("mousemove", handleEventw);
})


function handleEventh(e){
    var relPos = e.clientX + 10 - posh.left
    var value = Math.floor(relPos / Stepsh)
    var relPos2 = value * Stepsh
    elementh.style.setProperty("--relative_pos",`${relPos2}px`)

    texth.innerHTML = value + 3

}

function handleEventw(e){
    var relPos = e.clientX +10 - posw.left
    var value = Math.floor(relPos / Stepsw)
    var relPos2 = value * Stepsw
    elementw.style.setProperty("--relative_pos",`${relPos2}px`)

    textw.innerHTML = value +3
}