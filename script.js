const grid = document.getElementById('grid');
const colourPicker = document.getElementById('colourPicker');
const colourBtn = document.getElementById('colourBtn');
const randomBtn = document.getElementById('randomBtn');
const eraserBtn = document.getElementById('eraserBtn');
const clearBtn = document.getElementById('clearBtn');
const sizeValue = document.getElementById('sizeValue');
const sizeSlider = document.getElementById('sizeSlider');

colourPicker.oninput = (e) => setColour(e.target.value);
colourBtn.onclick = () => setMode('colour');
randomBtn.onclick = () => setMode('random');
eraserBtn.onclick = () => setMode('eraser');
clearBtn.onclick = () => reloadGrid();
sizeSlider.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);


let mode = 'colour';
let size = 16;
let colour = '#000000';
let mouseDown = true;

window.onload = () => {
    setupGrid(size);
}

function setMode(newMode) {
    mode = newMode;
}

function setColour(newColour) {
    colour = newColour;
}

function updateSizeValue(newSize) {
    sizeValue.textContent = `${newSize} X ${newSize}`;
}

function changeSize(newSize) {
    size = newSize;
    updateSizeValue(size);
    reloadGrid(size);
}

function reloadGrid() {
    grid.textContent = '';
    setupGrid(size);
}

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    
    for(let i=0; i< size*size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add('grid-element');
        gridElement.addEventListener("mousedown", () => mouseDown = false);
        gridElement.addEventListener("mouseup", () => mouseDown = true);
        gridElement.addEventListener("mousemove", changeColour);
        grid.appendChild(gridElement);
    }
}

function changeColour(e) {
    if (mouseDown && e.type === 'mousemove') {
        return
    }
    if (mode === 'colour') {
        e.target.style.backgroundColor = colour;
    }
    if (mode === 'random') {
        const R = Math.floor(Math.random() * 256);
        const G = Math.floor(Math.random() * 256);
        const B = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${R}, ${G}, ${B})`;
    }
    if (mode === 'eraser') {
        e.target.style.backgroundColor = '#FFFFFF';
    }
}