const button = document.getElementById('startb')
const backb = document.getElementById('backb')
const wordle = document.getElementById("wordle");
const active = document.querySelector('.-grid2')

var rows = parseInt(wordle.dataset.rows)
var columns = parseInt(wordle.dataset.columns)
var letters = [];
var nextSel = 1;
var currentRow = 1;
var Word
var Words = []
var Wanted = []

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
  StartDisable()
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
  currentRow++
}

function checkWord() {
  if (nextSel / (currentRow * columns) > 1) {
    let InputWord = ""
    for (let i = (currentRow-1) * columns; i < currentRow* columns; i++) {
      InputWord += letters[i]
    }
    if (Words.includes(InputWord)) {
      checkSpelling(InputWord.split(''))
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
  } else if (event.key == 'Escape') {
    if (active.classList.contains('wordleOpen') && !(button.classList.contains('disabled'))){
      clear()
      active.classList.remove('wordleOpen')
    }
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


// TODO:
// EDIT TILE SIZE

