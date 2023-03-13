const button = document.querySelectorAll('.buttons')
const rowscolumns = document.getElementById('sliderh')

var rows = parseInt(rowscolumns.dataset.rows)
var columns = parseInt(rowscolumns.dataset.columns)

function update() {
    console.log(rowscolumns.dataset.rows)
    console.log(rowscolumns.dataset.columns)
}

button.forEach(item => {
    item.addEventListener("click", update);
})