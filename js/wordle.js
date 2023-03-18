const button = document.getElementById('startb')
const backb = document.getElementById('backb')
const wordle = document.getElementById("wordle");
const active = document.querySelector('.-grid2')
const bigWordle = document.querySelector('#big_wordle')

var rows = parseInt(wordle.dataset.rows)
var columns = parseInt(wordle.dataset.columns)
var letters = [];
var nextSel = 1;
var currentRow = 1;
var Word
var Words = []
var Wanted = []
var win = 0

function WantedLetters() {
  Wanted = Word.split('')
}

function StartDisable() {
  button.classList.toggle('disabled');
  setTimeout(() => {
    button.classList.toggle('disabled');
  }, 1000);
}

function openWord() {
  $.get ('/word-list/words1/letters_' + columns + '.txt', {},function (content) {
    let lines=content.split ('\n');
    let randomIndex = Math.floor(Math.random() * lines.length);
    Words = []
    Word = String(lines[randomIndex]).substring(0, columns)
    for (let i = 0; i < lines.length; i++) {
      Words.push(String(lines[i]).substring(0, columns))
    }
    console.log(Word)
    WantedLetters()
  });
}

function update() {
  StartDisable();

  letters = []
  rows = parseInt(wordle.dataset.rows)
  columns = parseInt(wordle.dataset.columns)
  wordle.style.setProperty("--width", `${columns}`)
  currentRow = 1
  nextSel = 1
  win = 0
  tileSize()
  openWord()


  for (let i = 0; i < (rows * columns); i++) {
    letters.push("")
  }

  let i = 0
  letters.forEach(function(letter) {
    i++
    var newDiv = document.createElement("div");
    newDiv.className = "letter_field";
    var p = document.createElement("p");
    newDiv.id = `${i}p`
    p.id = i
    var node = document.createTextNode(letter);
    p.appendChild(node);
    newDiv.appendChild(p);
    wordle.appendChild(newDiv);
  });
  document.getElementById("1p").classList.add("current")
}

function clear() {
  setTimeout(function(){ 
    wordle.innerHTML = ""
  }, 1000);
  StartDisable()
}

function enterLetter(key) {
  if (nextSel / (currentRow * columns) <= 1) {
    let currentp = document.getElementById(nextSel)
    letters[nextSel - 1] = key
    currentp.innerHTML = letters[nextSel - 1]
    document.getElementById(`${nextSel}p`).classList.remove("current")
    nextSel++
    if (nextSel <= currentRow * columns) {
      document.getElementById(`${nextSel}p`).classList.add("current")
    }
    else {
      document.getElementById(`${nextSel - 1}p`).classList.add("current")
    }
    if (nextSel == currentRow*columns + 1) {
      nextSel--;
    }
  }
}

function removeLetter() {
  if (nextSel-1 !== (currentRow-1) * columns) {
    document.getElementById(`${nextSel}p`).classList.remove("current")
    if (letters[nextSel - 1] == "") {
      nextSel--
    }
    document.getElementById(`${nextSel}p`).classList.add("current")
    let currentp = document.getElementById(nextSel)
    letters[nextSel - 1] = ""
    currentp.innerHTML = letters[nextSel - 1]
  }
}

function checkSpelling(inputWord, inputWordFull) {
  for (let i = (currentRow-1) * columns; i < (currentRow) * columns; i++) {
    const currente = document.getElementById(i + 1).parentNode;
    currente.style.setProperty("background-color","gray")
  }

  if (Word != inputWordFull || win) {
    Wanted.forEach((checkEnd, indexEnd) => {
      inputWord.forEach((checkInp,indexInp) => {
        if (checkInp == checkEnd) {
          const currentp = document.getElementById(indexInp + (currentRow-1) * columns + 1).parentNode;
          if (indexInp == indexEnd) {
            currentp.style.setProperty("background-color", "#45ff17")
          }
          else {
            const style = window.getComputedStyle(currentp);
            const backgroundColor = style.getPropertyValue('background-color');
            if (backgroundColor !== "rgb(69, 255, 23)") {
              currentp.style.setProperty("background-color", "orange")
            } else {
            }
          }
        }
      })
    });
    document.getElementById(`${nextSel}p`).classList.remove("current")
    nextSel++;
    document.getElementById(`${nextSel}p`).classList.add("current")
    currentRow++
  }
  else {
    for(let i = (currentRow - 1) * columns + 1; i <= currentRow * columns; i++) {
      document.getElementById(`${i}p`).style.setProperty("background-color", "#45ff17")
    }
    document.getElementById(`${nextSel}p`).classList.remove("current")
    win = 1
    console.log(win)
    WinAnim = (currentRow - 1) * columns + 1
    winAnimation()
  }
}

function checkWord() {
  // if ((nextSel+1) / (currentRow * columns) > 1) {
    let InputWord = ""
    for (let i = (currentRow-1) * columns; i < currentRow* columns; i++) {
      InputWord += letters[i]
    }
    if (Words.includes(InputWord)) {
      checkSpelling(InputWord.split(''), InputWord)
    }
  // }
}

document.addEventListener('keydown', function(event) {
  if (event.key >= 'a' && event.key <= 'z' && !win) {
    enterLetter(event.key)
  } else if (event.key == 'Backspace' && !win) {
    removeLetter()
  } else if (event.key == 'Enter' && !win) {
    checkWord()
  } else if (event.key == 'Escape') {
    if (active.classList.contains('wordleOpen') && !(button.classList.contains('disabled'))){
      clear()
      active.classList.remove('wordleOpen')
    }
  } else if (event.key == 'ArrowLeft' && !win){
    goLeft()
  } else if (event.key == 'ArrowRight' && !win){
    goRight()
  }
});


backb.addEventListener("click", () => {
  if(backb.classList.contains('clickable')) {
    clear();
  }
  active.classList.remove('wordleOpen')
  backb.classList.remove('clickable')
})

button.addEventListener("click", () => {
  active.classList.add('wordleOpen')
  backb.classList.add('clickable')
  update();
})


function tileSize() {
  let availHeight = parseInt($(window).height()) - 100
  let availWidth = parseInt($(window).width()) - 100
  
  if (availHeight >= (rows*100) && availWidth >= (columns * 100)) {
    active.style.setProperty('--elemSize', '10rem')
    active.style.setProperty('--elemSize2', '8.5rem')
  }
  else if (availWidth < (columns*100)) {
    let elemSize = availWidth/(columns*10)
    active.style.setProperty("--elemSize", `${elemSize}rem`)
    active.style.setProperty("--elemSize2", `${elemSize - 1.5}rem`)
  }
  else {
    let elemSize = availHeight/(rows*10)
    active.style.setProperty("--elemSize", `${elemSize}rem`)
    active.style.setProperty("--elemSize2", `${elemSize - 1.5}rem`)
  }
}

window.onresize = function() {
  tileSize()
}


// Get the parent div element
var wordle_elem = document.getElementById("wordle");
var pElements = document.querySelectorAll("letter_field");

function changeCurrent(currentID, selDiv) {
  if (currentID > (currentRow - 1) * columns && currentID <= currentRow * columns) {
    for (let i = (currentRow - 1) * columns + 1; i <= currentRow * columns; i++) {
      document.getElementById(`${i}p`).classList.remove("current")
    }
    selDiv.classList.add("current")
    nextSel = currentID;
  }
}

wordle_elem.addEventListener("click", function(event) {
  let currID = event.target.id;
  let currentID = parseInt(currID.substring(0, currID.length - 1))
  if (!win){
    changeCurrent(currentID, event.target)
  }
});


function goLeft() {
  if ((nextSel - 1) > (currentRow - 1) * columns) {
    document.getElementById(`${nextSel}p`).classList.remove("current")
    nextSel--
    document.getElementById(`${nextSel}p`).classList.add("current")
  }
}
function goRight() {
  if ((nextSel + 1) < currentRow * columns + 1) {
    document.getElementById(`${nextSel}p`).classList.remove("current")
    nextSel++
    document.getElementById(`${nextSel}p`).classList.add("current")
  }
}

var WinAnim = 0

function winAnimation() {
  // TODO: victory text
  // if (!bigWordle.classList.contains("won")) {
  //   let p = document.createElement("p")
  //   let WinText = document.createTextNode("You Won!");
  //   p.append(WinText)
  //   bigWordle.appendChild(p)
  // }

  bigWordle.classList.add("won")
  setTimeout(function() {
    document.getElementById(`${WinAnim}p`).classList.add("win")
    WinAnim++;
    if (WinAnim <= (currentRow * columns)) { 
      winAnimation();
    }
  }, 250)
}