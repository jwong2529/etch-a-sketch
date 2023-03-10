
const drawingBoard = document.querySelector(".drawing-board");
const rangeSlider = document.querySelector(".mouseSlider");
const rangeValue = document.querySelector("#rangeValue");
const colorPicker = document.querySelector("#colorpicker");
const eraserButton = document.querySelector(".eraser");
const colorButton = document.querySelector(".color-mode");
const clearButton = document.querySelector(".clear");
const rainbowButton = document.querySelector(".rainbow");
const gridButton = document.querySelector(".grid-size");

//default settings
let colorMode = true;
let eraseMode = false;
let rainbowMode = false;
let gridMode = false;
window.onload = () => {
    setGridSize(16);
    setBorder(colorButton);
    coloring();
};

// setting the grid size based on slider value
//makes rows of divs and makes divs in each row
function setGridSize(num) {
    clearingGridContainer(drawingBoard);
    for (let i = 0; i < num; i++) {
        let gridRow = document.createElement('div');
        drawingBoard.appendChild(gridRow);
        gridRow.style.display = "flex";
        //makes each div's width an entire row
        gridRow.style.flex = "1";
        for (let i = 0; i < num; i++) {
            let gridBox = document.createElement('div');
            gridRow.appendChild(gridBox);
            gridBox.classList.add('individual-box');
            //makes divs fill in each row
            gridBox.style.flex = "1";
        }
    }
    //keeps coloring/erasing even if grid size is changed
    coloring();
    erasing();
    randomColoring();
    toggleGrid();
}

//clears grid boxes so aren't made on top of each other after each grid sizing
function clearingGridContainer(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

//sets grid size label
function gridSizeLabel(num) {
    let label = num + " x " + num;
    rangeValue.textContent = label;
}
//sets grid size and label based on user's input on range slider
rangeSlider.addEventListener("input", function(e) {
    setGridSize(rangeSlider.valueAsNumber);
    gridSizeLabel(rangeSlider.valueAsNumber);
});

//creates or removes gold border based on current mode in toolbar
function setBorder(tool) {
    tool.style.borderColor = "gold";
    tool.style.borderWidth = "3px";
    tool.style.borderStyle = "solid";
}
function noBorder(tool) {
    tool.style.borderColor = "color";
    tool.style.borderWidth = "medium";
    tool.style.borderStyle = "none";
}

//keeps track of when mouse is pressed
let mouseDown = 0;
drawingBoard.onmousedown = function() { 
    mouseDown = 1;
}
drawingBoard.onmouseup = function() {
    mouseDown = 0;
}

//colors when mouse is pressed + hovered over a div simultaneously
function coloring() {
    if (colorMode === true) {
        document.querySelectorAll(".individual-box").forEach(item => item.addEventListener("mouseover", function(e) {
            if (mouseDown === 1) {
                item.style.backgroundColor = colorPicker.value;
            }
        }));
    }
}
//toggles off all other modes except for coloring
colorButton.addEventListener("click", function(e) {
    colorMode = true;
    eraseMode = false;
    rainbowMode = false;;
    setBorder(colorButton);
    noBorder(eraserButton);
    noBorder(rainbowButton);
    coloring();
});

//colors with random hex values when mouse is pressed + hovered over a div simultaneously
function randomColoring() {
    if (rainbowMode === true) {
        document.querySelectorAll(".individual-box").forEach(item => item.addEventListener("mouseover", function(e) {
            if (mouseDown === 1) {
                let randomColor = Math.floor(Math.random()*16777215).toString(16);
                item.style.backgroundColor = "#" + randomColor;
            }
        }));
    }
}
//toggles off all other modes except for erasing
rainbowButton.addEventListener("click", function(e) {
    rainbowMode = true;
    colorMode = false;
    eraseMode = false;
    setBorder(rainbowButton);
    noBorder(colorButton);
    noBorder(eraserButton);
    randomColoring();
});

//erases when mouse is pressed + hovered over a div simultaneously
function erasing() {
    if (eraseMode === true) {
        document.querySelectorAll(".individual-box").forEach(item => item.addEventListener("mouseover", function(e) {
            if (mouseDown === 1) {
                item.style.backgroundColor = "#f6f4f4";
            }
        }));
    }
}
//toggles off all other modes except for erasing
eraserButton.addEventListener("click", function(e) {
    eraseMode = true;
    colorMode = false;
    rainbowMode = false;;
    setBorder(eraserButton);
    noBorder(colorButton);
    noBorder(rainbowButton);
    erasing();
});

//clear the canvas by changing color of all boxes to white
function clearCanvas() {
    document.querySelectorAll(".individual-box").forEach(item => item.style.backgroundColor = "#f6f4f4");
    //creates gold border for clear button for short period of time
    setBorder(clearButton);
    setTimeout(() => {
        noBorder(clearButton);
    },300);
}
clearButton.addEventListener("click", clearCanvas);

//toggle grid lines on and off
function toggleGrid() {
    if (gridMode === true) {
        document.querySelectorAll(".individual-box").forEach(item => {
            item.style.borderColor = "black";
            item.style.borderWidth = "1px";
            item.style.borderStyle = "solid";
        });
        setBorder(gridButton);
    }
    else {
        document.querySelectorAll(".individual-box").forEach(item => noBorder(item));
        noBorder(gridButton);
    }
}
gridButton.addEventListener("click", function(e) {
    gridMode = !gridMode;
    toggleGrid();
});

