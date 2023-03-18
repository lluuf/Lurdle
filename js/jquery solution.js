function openWord() {
  $.get ('/word-list/words1/letters_' + columns + '.txt', {},function (content) {
    let lines=content.split ('\n');
    let randomIndex = Math.floor(Math.random() * lines.length);
    console.log (`Random line : ${lines [randomIndex]}`)
  });
}