const undo = (canvas, undoList)=>{
    if(canvas._objects.length >0){
        undoList.push(canvas._objects.pop());
        canvas.renderAll()
    }
}
const redo = (canvas, undoList, REDO)=>{
    console.log(undoList);
    if(undoList.length>0){
        REDO = true;
        canvas.add(undoList.pop());
    }
}

const initUndo = (canvas, undoList, REDO)=>{

}
const initIntro = ()=>{
    /*
    var tour = {
        id: "hello-hopscotch",
        steps: [
            {
                title: "Drawing Utilities",
                content: "Click to use different tools: <b>Pencil</b>, <b>Line</b>, <b>Room</b> for sketching your floorplan",
                target: document.getElementById('drawingTool'),
                placement: "right"
            },
            {
                title: "Furniture and Amenities",
                content: "You can <b>Drag and drop</b> furniture and amenities to the floor plan",
                target: document.getElementById('furnitureTool'),
                placement: "right"
            },
            {
                title: "Room Label",
                content: "You can add label to the floor plan",
                target: document.getElementById('labelTool'),
                placement: "right"
            },
            {
                title: "Upload Your Floorplan",
                content: "You can also add upload your local floorplan images.",
                target: document.getElementById('importTool'),
                placement: "right"
            },
            {
                title: "Download and Save",
                content: "You can save your work to your devices by click download button",
                target: document.getElementById('download'),
                placement: "right"
            }
        ],
        showPrevButton: true,
    };
    */
    document.getElementById('dialog-source').addEventListener('click', ()=>{
        var tourSource = {
            id: "tourSource",
            steps: [
                {
                    title: "Upload Your Floorplan",
                    content: "You can also add upload your local floorplan images.",
                    target: document.getElementById('importTool'),
                    placement: "right"
                },
                {
                    title: "Eraser",
                    content: "Click to use eraser",
                    target: document.getElementById('eraserTool'),
                    placement: "right"
                },
                {
                    title: "Architects",
                    content: "You can <b>Drag and drop</b> windows, doors, etc..",
                    target: document.getElementById('furnitureTool'),
                    placement: "right"
                },
                {
                    title: "Room Label",
                    content: "You can add label to the floor plan",
                    target: document.getElementById('labelTool'),
                    placement: "right"
                },
                {
                    title: "Drawing Utilities",
                    content: "Click to use different tools: <b>Pencil</b>, <b>Line</b>, <b>Room</b> for sketching your floorplan",
                    target: document.getElementById('drawingTool'),
                    placement: "right"
                },
                {
                    title: "Last step",
                    content: "Process to the information and order detail page",
                    target: document.getElementById('download'),
                    placement: "right"
                }
            ],
            showPrevButton: true,
        }
        document.querySelector('.initial-dialog').style.display = "none";
        hopscotch.startTour(tourSource);
    });
    document.getElementById('dialog-raw').addEventListener('click', ()=>{
        document.querySelector('.initial-dialog').style.display = "none";
        var tourRaw = {
            id: "tourRaw",
            steps: [
                {
                    title: "Templates",
                    content: "You can use the templates to create your floorplan",
                    target: document.getElementById('templatesTool'),
                    placement: "right"
                },
                {
                    title: "Drawing Utilities",
                    content: "Click to use different tools: <b>Pencil</b>, <b>Line</b>, <b>Room</b> for sketching your floorplan",
                    target: document.getElementById('drawingTool'),
                    placement: "right"
                },
                {
                    title: "Architects",
                    content: "You can <b>Drag and drop</b> windows, doors, etc..",
                    target: document.getElementById('furnitureTool'),
                    placement: "right"
                },
                {
                    title: "Room Label",
                    content: "You can also put label to the floor plan",
                    target: document.getElementById('labelTool'),
                    placement: "right"
                },
                {
                    title: "Eraser",
                    content: "Also use eraser",
                    target: document.getElementById('eraserTool'),
                    placement: "right"
                },
                {
                    title: "Last step",
                    content: "Process to the information and order detail page",
                    target: document.getElementById('download'),
                    placement: "right"
                }
            ],
            showPrevButton: true,
        }
        hopscotch.startTour(tourRaw);
    });
    
    // Start the tour!
    //hopscotch.startTour(tour);
}
const moveVector = (canvas, vector)=>{
    let allObject = canvas.getObjects();

    allObject.forEach((object)=>{
        if(object.id !== 'imported'){
            object.set({
                top: object.top + vector[0],
                left: object.left + vector[1]
            });
            object.setCoords()
        }
    })
}
const checkSelected = (canvas)=>{
    let isSelected = false;
    let allObject = canvas.getObjects();

    for(let i = 0; i < allObject.length ; i++){
        if(allObject[i].selected === true){
            isSelected = true;
            break;
        }
    }
    return isSelected;
}
export {undo, redo, initUndo, initIntro, moveVector, checkSelected};
