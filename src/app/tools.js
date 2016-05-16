
const drawLine = function (canvas, o) {
    const pointer = canvas.getPointer(o.e);
    const pointerTouch = o;
    let points = [];
    if(!isNaN(pointer.x))
        points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
    else
        points = [pointerTouch.x, pointerTouch.y, pointerTouch.x, pointerTouch.y];
    return new fabric.Line(points, {
        strokeWidth: 3,
        fill: 'black',
        stroke: 'black',
        originX: 'center',
        originY: 'center',
        hasBorders: false,
        hasControls: false,
        selectable: false
    });
}

const drawRoom = function (canvas, o) {

    var startY = o.y,
        startX = o.x;
    if(o.e !== undefined){
        startY = o.e.offsetY
        startX = o.e.offsetX
    }

    return new fabric.Rect({
        top : startY,
        left : startX,
        width : 0,
        height : 0,
        fill : 'transparent',
        stroke: 'black',
        strokeWidth: 3,
        hasBorders: false,
        hasControls: false,
        selectable:false
    });
}


export { drawLine, drawRoom};

