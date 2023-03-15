const button = document.getElementById('startb')
const backb = document.getElementById('backb')
const wordle = document.getElementById("wordle");

var rows = parseInt(wordle.dataset.rows)
var columns = parseInt(wordle.dataset.columns)
var letters = [];
// var colors = []
var nextSel = 1;
var currentRow = 1;
var Word
var Words = []
var Wanted = []

function WantedLetters() {
  Wanted = Word.split('')
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
    console.log(Words)
    console.log(Word)
    WantedLetters()
  });
}

function update() {
  letters = []
  // colors = []
  rows = parseInt(wordle.dataset.rows)
  columns = parseInt(wordle.dataset.columns)
  wordle.style.setProperty("--width", `${columns}`)
  currentRow = 1
  nextSel = 1
  openWord()

  for (let i = 0; i < (rows * columns); i++) {
    letters.push("")
    // colors.push("")
  }

  let i = 0
  letters.forEach(function(letter) {
    i++
    var newDiv = document.createElement("div");
    newDiv.className = "letter_field";
    // newDiv.id = i
    var p = document.createElement("p");
    p.id = i
    var node = document.createTextNode(letter);
    p.appendChild(node);
    newDiv.appendChild(p);
    wordle.appendChild(newDiv);
  });
  
}

function clear() {
  setTimeout(function(){ 
    wordle.innerHTML = ""
  }, 1000);
}

function enterLetter(key) {
  if (nextSel / (currentRow * columns) <= 1) {
    let currentp = document.getElementById(nextSel)
    letters[nextSel - 1] = key
    currentp.innerHTML = letters[nextSel - 1]
    nextSel++
  }
}

function removeLetter() {
  if (nextSel-1 !== (currentRow-1) * columns) {
    nextSel--
    let currentp = document.getElementById(nextSel)
    letters[nextSel - 1] = ""
    currentp.innerHTML = letters[nextSel - 1]
  }
}

function checkSpelling(inputWord) {
  for (let i = (currentRow-1) * columns; i < (currentRow) * columns; i++) {
    const currente = document.getElementById(i + 1).parentNode;
    currente.style.setProperty("background-color","gray")
  }
  
  Wanted.forEach((checkEnd, indexEnd) => {
    // const currente = document.getElementById(indexEnd + (currentRow-1) * columns + 1).parentNode;
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
  console.log(Wanted)
  console.log(inputWord)
  currentRow++
}

function checkWord() {
  if (nextSel / (currentRow * columns) > 1) {
    console.log("checking")
    let InputWord = ""
    for (let i = (currentRow-1) * columns; i < currentRow* columns; i++) {
      InputWord += letters[i]
    }
    if (Words.includes(InputWord)) {
      console.log("CORRECT")
      checkSpelling(InputWord.split(''))
    } else {
      console.log("WRONG")
    }
    



  }
}

document.addEventListener('keydown', function(event) {
  if (event.key >= 'a' && event.key <= 'z') {
    enterLetter(event.key)
  } else if (event.key == 'Backspace') {
    removeLetter()
  } else if (event.key == 'Enter') {
    checkWord()
  } else {
    console.log(event.key)
  }
});

backb.addEventListener("click", clear);

button.addEventListener("click", update);