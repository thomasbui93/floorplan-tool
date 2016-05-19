const drawGrid = function (canvas, grid_size, gridGroup) {

    grid_size || (grid_size = 25);
    var currentCanvasWidth = canvas.getWidth();
    var currentCanvasHeight = canvas.getHeight();


    // Drawing vertical lines
    var x;
    for (x = 0; x <= currentCanvasWidth; x += grid_size) {
        let xLine = new fabric.Line([x, 0, x, currentCanvasHeight], {
            left: x,
            top: 0,
            stroke: 'black'
        });
        gridGroup.addWithUpdate(xLine);
    }

    // Drawing horizontal lines
    var y;
    for (y = 0; y <= currentCanvasHeight; y += grid_size) {
        let yLine = new fabric.Line([0, y, currentCanvasWidth, y], {
            left: 0,
            top: y,
            stroke: 'black'
        });
        gridGroup.addWithUpdate(yLine);
    }
    gridGroup.set("selectable", false);
    canvas.add(gridGroup);
}
export { drawGrid }