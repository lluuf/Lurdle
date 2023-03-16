const button = document.querySelectorAll('.buttons')
const menu = document.querySelector('.menu')
const active = document.querySelector('.-grid2')
const wordleGrid = document.getElementById('wordle')
const elementh = document.querySelector('#sliderh')
const elementw = document.querySelector('#sliderw')
const texth = document.querySelector('#texth')
const textw = document.querySelector('#textw')
const container = document.getElementById('container')

var posh
var posw
var hWidth
var wWidth
var Stepsh
var Stepsw
var steepsh = 8
var steepsw = 5
var valueh = 3
var valuew = 2
var rows = valueh+3
var columns = valuew+3

function relcalch() {
    let relPos2 = (valueh * Stepsh) / hWidth * 100
    elementh.style.setProperty("--relative_pos",`${relPos2}%`)
    wordleGrid.dataset.rows = `${valueh + 3}`
    wordleGrid.dataset.columns = `${valuew + 3}`
    texth.innerHTML = valueh +3
}

function relcalcw() {
    let relPos2 = (valuew * Stepsw) / wWidth * 100
    elementw.style.setProperty("--relative_pos",`${relPos2}%`)
    wordleGrid.dataset.rows = `${valueh + 3}`
    wordleGrid.dataset.columns = `${valuew + 3}`
    textw.innerHTML = valuew +3
}

function refresh() {
    posh = elementh.getBoundingClientRect();
    posw = elementw.getBoundingClientRect();
    hWidth = posh.right-posh.left
    wWidth = posw.right-posw.left
    Stepsh = hWidth / steepsh
    Stepsw = wWidth / steepsw
    relcalch(valueh)
    relcalcw(valuew)
}

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

document.body.addEventListener("mouseup", () => {
    elementw.removeEventListener("mousemove", handleEventw);
    elementh.removeEventListener("mousemove", handleEventh);
});

function handleEventh(e){
    let relPos = e.clientX + 10 - posh.left
    valueh = Math.floor(relPos / Stepsh)
    
    relcalch(valueh)
}

function handleEventw(e){
    let relPos = e.clientX +10 - posw.left
    valuew = Math.floor(relPos / Stepsw)
    
    
    relcalcw(valuew)
}

button.forEach(item => {
    item.addEventListener("click", () => {
        active.classList.toggle('wordleOpen')
    });
})
