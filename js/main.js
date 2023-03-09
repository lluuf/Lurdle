const elementh = document.querySelector('#sliderh')
const elementw = document.querySelector('#sliderw')
const texth = document.querySelector('#texth')
const textw = document.querySelector('#textw')

var posh
var posw
var hWidth
var wWidth
var Stepsh
var Stepsw
var valueh = 3
var valuew = 2

function relcalch() {
    var relPos2 = valueh * Stepsh
    elementh.style.setProperty("--relative_pos",`${relPos2}px`)
    texth.innerHTML = valueh +3
}

function relcalcw() {
    var relPos2 = valuew * Stepsw
    elementw.style.setProperty("--relative_pos",`${relPos2}px`)
    textw.innerHTML = valuew +3
}

function refresh() {
    posh = elementh.getBoundingClientRect();
    posw = elementw.getBoundingClientRect();
    hWidth = posh.right-posh.left
    wWidth = posw.right-posw.left
    console.log(hWidth)
    Stepsh = hWidth / 8
    Stepsw = wWidth / 5
    relcalch(valueh)
    relcalcw(valuew)
}

window.onresize = refresh
window.onload = refresh

elementh.addEventListener("mousedown", () => {
    refresh();
    elementh.addEventListener("mousemove", handleEventh);
})
    
elementh.addEventListener("mouseup", () => {
    refresh();
    elementh.removeEventListener("mousemove", handleEventh);
})

elementw.addEventListener("mousedown", () => {
    refresh();
    elementw.addEventListener("mousemove", handleEventw);
})
    
elementw.addEventListener("mouseup", () => {
    refresh();
    elementw.removeEventListener("mousemove", handleEventw);
})


function handleEventh(e){
    var relPos = e.clientX + 10 - posh.left
    valueh = Math.floor(relPos / Stepsh)
    relcalch(valueh)
}

function handleEventw(e){
    var relPos = e.clientX +10 - posw.left
    valuew = Math.floor(relPos / Stepsw)
    relcalcw(valuew)
}