

const drawingBoard = document.querySelector(".drawing-board");
const rangeSlider = document.querySelector(".mouseSlider");


// setting the grid size based on slider value, default is 16 x 16
//makes rows of divs and makes divs in each row
function setGridSize(num) {
    clearingGrid(drawingBoard);
    for (let i = 0; i < num; i++) {
        let gridRow = document.createElement('div');
        drawingBoard.appendChild(gridRow);
        gridRow.style.display = "flex";
        //makes each div's width an entire row
        gridRow.style.flex = "1";
        for (let i = 0; i < num; i++) {
            let gridBox = document.createElement('div');
            gridRow.appendChild(gridBox);
            //makes divs fill in each row
            gridBox.style.flex = "1";
            //just to look at borders
            //possibly include option for user to be able to see borders!
            gridBox.style.borderColor = "black";
            gridBox.style.borderWidth = "1px";
            gridBox.style.borderStyle = "solid";
        }
    }
}

function clearingGrid(container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

//sets grid size based on user's input on range slider
rangeSlider.addEventListener("input", function(e) {
    setGridSize(rangeSlider.valueAsNumber);
});

