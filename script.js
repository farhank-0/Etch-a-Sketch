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
sizeValue.onmousemove = (e) => updateSizeValue(e.target.value);
sizeSlider.onchange = (e) => changeSize(e.target.value);


let mode = 'colour';
let size = 16;
let colour = '#000000';
let mouseDown = false;

function setMode(newMode) {
    mode = newMode;
}

function setColour(newColour) {
    colour = newColour;
}

function updateSizeValue(size) {
    sizeValue.textContent = `${size} X ${size}`;
}

function changeSize(newSize) {
    size = newSize;
    reloadGrid();
    updateSizeValue(newSize);
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
        gridElement.addEventListener("mousedown", () => mouseDown = true);
        gridElement.addEventListener("mouseup", () => mouseDown = false);
        gridElement.addEventListener("mousemove", changeColour);
        grid.appendChild(gridElement);
    }
}

function changeColour(e) {
    if (mouseDown && e.type === 'mousemove'){
        e.target.style.backgroundColor = colour;
    }
}