const wordleGrid = document.getElementById('wordle')
const elementh = document.querySelector('#sliderh')
const Bigelementh = document.querySelector('#height')
const elementw = document.querySelector('#sliderw')
const Bigelementw = document.querySelector('#width')
const texth = document.querySelector('#texth')
const textw = document.querySelector('#textw')
const winField = document.getElementById('winField')
const darkDisplay = document.getElementById('darkDisplay')
const darkButton = document.getElementById('darkButton')

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
    retrieveData()
}

window.onload = refresh

elementh.addEventListener("mousedown", () => {
    refresh();
    Bigelementh.addEventListener("mousemove", handleEventh);
})
    
elementh.addEventListener("mouseup", () => {
    refresh();
    Bigelementh.removeEventListener("mousemove", handleEventh);
})

elementw.addEventListener("mousedown", () => {
    refresh();
    Bigelementw.addEventListener("mousemove", handleEventw);
})
    
elementw.addEventListener("mouseup", () => {
    refresh();
    Bigelementw.removeEventListener("mousemove", handleEventw);
})

elementh.addEventListener("mousedown", handleEventh);
elementw.addEventListener("mousedown", handleEventw)

document.body.addEventListener("mouseup", () => {
    Bigelementw.removeEventListener("mousemove", handleEventw);
    Bigelementh.removeEventListener("mousemove", handleEventh);
});

function handleEventh(e){
    let relPos = e.clientX + 10 - posh.left
    if (relPos <= 0) relPos = 0
    valueh = Math.floor(relPos / Stepsh)
    
    relcalch(valueh)
}

function handleEventw(e){
    let relPos = e.clientX +10 - posw.left
    if (relPos <= 0) relPos = 0
    valuew = Math.floor(relPos / Stepsw)
    
    
    relcalcw(valuew)
}


window.addEventListener('load', () => {
    document.body.style.setProperty('overflow','visible')
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.body.style.setProperty('overflow','hidden');
    }, 1);
});

function retrieveData() {
    if (localStorage.getItem("wordleWins") === null) {
        console.log("myInt is not set in localStorage");
        localStorage.setItem("wordleWins", 0)
        winField.innerHTML = "wins: 0"
    }
    else {
        let allWins = localStorage.getItem("wordleWins")
        localStorage.setItem("wordleWins", allWins)
        winField.innerHTML = `wins: ${allWins}`
    }

    if (localStorage.getItem('light') == 1) {
        document.body.classList.add('light')
    }
}

darkButton.addEventListener("click", () => {
    if (document.body.classList.contains('light')) {
        localStorage.setItem('light', 0)
    }
    else {
        localStorage.setItem('light', 1)
    }
    document.body.classList.toggle('light');
})