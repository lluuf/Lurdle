const element = document.getElementById('height_sl')

// always checking if the element is clicked, if so, do alert('hello')
element.addEventListener("mousedown", () => {
    element.addEventListener("mousemove", (e) => {
        console.log(`Mouse X: ${e.clientX}`);
    });
});