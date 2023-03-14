const button = document.getElementById('startb')
const rowscolumns = document.getElementById('sliderh')
const wordle = document.getElementById("wordle");

var rows = parseInt(rowscolumns.dataset.rows)
var columns = parseInt(rowscolumns.dataset.columns)
var letters = [];

function openWord() {
  $.get ('/word-list/words1/letters_' + columns + '.txt', {},function (content) {
    let lines=content.split ('\n');
    let randomIndex = Math.floor(Math.random() * lines.length);
    console.log (`Random line : ${lines [randomIndex]}`)
    // console.log (`"file.txt" contains ${lines.length} lines`)
    // console.log (`First line : ${lines [0]}`)
  });
}


function update() {
  rows = parseInt(rowscolumns.dataset.rows)
  columns = parseInt(rowscolumns.dataset.columns)
  openWord()
  for (let i = 0; i < (rows * columns); i++) {
    letters.push("")
  }
  console.log(letters)

  letters.forEach(function(letter) {
    var newDiv = document.createElement("div");
    newDiv.className = "letter_field";
    var p = document.createElement("p");
    var node = document.createTextNode(letter);
    p.appendChild(node);
    newDiv.appendChild(p);
    wordle.appendChild(newDiv);
  });
  // document.getElementById("wordle").textContent = "";
}

button.addEventListener("click", update);