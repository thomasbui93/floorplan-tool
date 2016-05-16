const drawRoom = function (canvas, points) {
    const polygon = new fabric.Polygon(points, {

        fill : 'transparent',
        stroke: 'black',
        strokeWidth: 3,
        selectable: false
    });
    canvas.add(polygon);
    canvas.centerObject(polygon);
    canvas.renderAll();
};
const drawLine = function (canvas, lineArray, black) {
    if(black || black === undefined){
        const line = new fabric.Line(lineArray, {
            strokeWidth: 3,
            fill: 'black',
            stroke: 'black',
            hasBorders: false,
            hasControls: false,
            selectable: false
        });
        canvas.add(line);
    }else {
        const line = new fabric.Line(lineArray, {
            strokeWidth: 3,
            fill: 'white',
            stroke: 'white',
            hasBorders: false,
            hasControls: false,
            selectable: false
        });
        canvas.add(line);
    }

}
const drawImage = (canvas, imageURL)=>{
    fabric.loadSVGFromURL(imageURL, function(objects, options) {
        var image = fabric.util.groupSVGElements(objects, options);
        const scaleRate = image.width > image.height ? canvas.width/image.width: canvas.height/image.height;

        image.set({
            left: 0,
            top: 0,
            hasBorders: false,
            hasControls: false,
            scaleX: scaleRate,
            scaleY: scaleRate,
            selectable: false
        });
        canvas.add(image);
        canvas.centerObject(image);
        canvas.renderAll();
    });
}
const studio = (canvas)=>{
    const points = [
        { x: 100, y: 100},
        { x: 100, y: 400},
        { x: 300, y: 400},
        { x: 300, y: 500},
        { x: 500, y: 500},
        { x: 500, y: 100}
    ];
    drawRoom(canvas, points)
};
const oneBR = (canvas)=>{

    const points = [
        { x: 0, y: 0},
        { x: 400, y: 0},
        { x: 400, y: 200},
        { x: 0, y: 200},
        { x: 0, y: 0},
        { x: 600, y: 0},
        { x: 600, y: 400},
        { x: 0, y: 400},
        { x: 0, y: 300},
        { x: 300, y: 300},
        { x: 300, y: 400},
        { x: 0, y: 400}
    ];
    drawRoom(canvas, points);

    //drawImage(canvas, './template/oneBr.svg');
}

const twoBR = (canvas)=>{
    const points = [
        { x: 0, y: 0},
        { x: 200, y:0},
        { x: 200, y: 200},
        { x: 200, y: 0},
        { x: 400, y: 0},
        { x: 400, y: 200},
        { x: 0, y: 200},
        { x: 0, y: 0},
        { x: 600, y: 0},
        { x: 600, y: 400},
        { x: 0, y: 400},
        { x: 0, y: 300},
        { x: 300, y: 300},
        { x: 300, y: 400},
        { x: 0, y: 400}
    ];
    drawRoom(canvas, points);
}

const threeBR = (canvas)=>{
    const points = [
        { x: 0, y: 0},
        { x: 400, y: 0},
        { x: 400, y: 200},
        { x: 0, y: 200},
        { x: 0, y: 0},

        { x: 600, y: 0},
        { x: 600, y: 400},
        { x: 400, y: 400},
        { x: 400, y: 0},
        { x: 600, y: 0},

        { x: 600, y: 500},
        { x: 400, y: 500},
        { x: 400, y: 600},
        { x: 0, y: 600},
        { x: 0, y: 450},
        { x: 400, y: 450},
        { x: 400, y: 500},
        { x: 400, y: 450},
        { x: 0, y: 450}
    ];
    drawRoom(canvas, points);
}
const fourBR = (canvas)=>{

}

export {studio, oneBR, twoBR, threeBR, fourBR};
