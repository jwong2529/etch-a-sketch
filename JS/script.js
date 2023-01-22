

const drawingBoard = document.querySelector(".drawing-board");
const rangeSlider = document.querySelector(".mouseSlider");
const rangeValue = document.querySelector("#rangeValue");
const colorMode = document.querySelector("#colorpicker");
const eraser = document.querySelector(".eraser");

//should set this into window.load
setGridSize(16);


// setting the grid size based on slider value, default is 16 x 16
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
            //just to look at borders
            //possibly include option for user to be able to see borders!
            //when toggling, change grid size button borders
            gridBox.style.borderColor = "black";
            gridBox.style.borderWidth = "1px";
            gridBox.style.borderStyle = "solid";
        }
    }
    coloring();
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
    document.querySelectorAll(".individual-box").forEach(item => item.addEventListener("mouseover", function(e) {
        if (mouseDown === 1) {
            item.style.backgroundColor = colorMode.value;
        }
    }));
}

function erasing() {

}