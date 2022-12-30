const board = document.querySelector('#board');
const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71', '#24c2b3','#9808b4', '#e6e72a'];
const SQUARES_NUMBER = 1000;

for (let i = 0; i < SQUARES_NUMBER; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    board.append(square);
    square.addEventListener('mouseover', () => {
        setColor(square);
    });
    square.addEventListener("mouseleave", () => {
        removeColor(square);
    })
}

function setColor(elem) {
    elem.style.backgroundColor = getColor();
    elem.style.boxShadow = `0 0 2px ${getColor()}, 0 0 30px ${getColor()}`;
}

function removeColor(elem) {
    elem.style.backgroundColor = '#1d1d1d';
    elem.style.boxShadow = '0 0 2px black';
}

function getColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];
}