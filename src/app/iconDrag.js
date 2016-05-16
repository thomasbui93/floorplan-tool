const iconDrag = (canvas, Event, STATE, furnitureURL, labelTag, labelConfig)=>{
    let icons = document.querySelectorAll('.icon img');
    [].forEach.call(icons, (icon)=>{
        icon.addEventListener('dragstart', (event)=>{

            //Event.emit('ICON_DRAG_START', event.target.src);
            furnitureURL = event.target.src;

            return false;
        }, false)
        icon.addEventListener('touchstart', (event)=>{
            //Event.emit('ICON_DRAG_START', event.target.src);
            furnitureURL = event.target.src;

            return false;
        }, false)
        icon.addEventListener('dragend', (event)=>{
            console.log('drag end');
        }, false)
    });
    /*/label control
    document.querySelector('#fontSize').addEventListener('change', (event)=>{
        const fontSize = event.target.value;
        if(!isNaN(parseFloat(fontSize)) && isFinite(fontSize)){
            labelConfig.fontSize = parseFloat(fontSize);
        }
    });
    document.querySelector('#fontStyle').addEventListener('change', (event)=>{
        labelConfig.fontStyle = event.target.value;
    });
    document.querySelector('#fontWeight').addEventListener('change', (event)=>{
        labelConfig.fontWeight = event.target.value;
    });
    /*
    let labels = document.querySelectorAll('.label');
    [].forEach.call(labels, (label)=>{
        label.addEventListener('dragstart', (event)=>{
            event.stopPropagation();
            event.preventDefault();
            labelTag = label.innerHTML.trim();
            return false;
        }, false)
    })
    */
    //end label control

    let canvasContainer = document.querySelector('.canvas-container');

    canvasContainer.addEventListener('click', (e)=>{
        e.preventDefault();
        return false;
    })
    canvasContainer.addEventListener('dragenter', (event)=>{
        event.preventDefault();
        return false;
    });
    canvasContainer.addEventListener('dragover', (event)=>{
        event.preventDefault();

        event.dataTransfer.dropEffect = 'copy';
        return false;
    })

    canvasContainer.addEventListener('dragleave', (event)=>{
        console.log('dragleave');
        event.preventDefault();
    })
    canvasContainer.addEventListener('drop', (e)=>{
        e.stopPropagation();
        e.preventDefault();
        if(labelTag !== null){
            canvas.add(new fabric.IText(labelTag, {
                fontFamily: "'Roboto', sans-serif",
                left: e.layerX,
                top: e.layerY,
                fontSize: labelConfig.fontSize,
                fontWeight: labelConfig.fontWeight,
                fontStyle: labelConfig.fontStyle,
                hasBorders: true,
                hasControls: false,
                borderColor: '#2c3e50',
                cornerColor: '#2c3e50',
                cornerSize: 2,
                transparentCorners: false
            }));
            let lastIndex = canvas._objects.length;
            canvas.setActiveObject(canvas.item(lastIndex-1));
            labelTag = null;
        }
        if(furnitureURL !== null){
            let cornerSize = 5;
            fabric.loadSVGFromURL(furnitureURL, function(objects, options) {
                var svgObject = fabric.util.groupSVGElements(objects, options);
                if(svgObject.height > svgObject.width){
                    const rate = svgObject.getWidth()/svgObject.getHeight();
                    if(rate < 0.2){
                        svgObject.set({
                            left: e.layerX,
                            top: e.layerY,
                            hasBorders: true,
                            hasControls: true,
                            borderColor: '#2c3e50',
                            cornerColor: '#2c3e50',
                            transparentCorners: false,
                            cornerSize: cornerSize,
                            originX: 'center',
                            originY: 'center',
                            scaleX: 100/svgObject.height,
                            scaleY: 100/svgObject.height
                        });
                    }else {
                        svgObject.set({
                            left: e.layerX,
                            top: e.layerY,
                            hasBorders: true,
                            hasControls: true,
                            borderColor: '#2c3e50',
                            cornerColor: '#2c3e50',
                            transparentCorners: false,
                            cornerSize: cornerSize,
                            originX: 'center',
                            originY: 'center',
                            scaleX: 50/svgObject.height,
                            scaleY: 50/svgObject.height
                        });
                    }

                }else {
                    const rate = svgObject.getHeight()/svgObject.getWidth();
                    console.log(rate);
                    if(rate < 0.2){
                        svgObject.set({
                            left: e.layerX,
                            top: e.layerY,
                            hasBorders: true,
                            hasControls: true,
                            borderColor: '#2c3e50',
                            cornerColor: '#2c3e50',
                            transparentCorners: false,
                            cornerSize: cornerSize,
                            originX: 'center',
                            originY: 'center',
                            scaleX: 100/svgObject.width,
                            scaleY: 100/svgObject.width
                        });
                    }else {
                        svgObject.set({
                            left: e.layerX,
                            top: e.layerY,
                            hasBorders: true,
                            hasControls: true,
                            borderColor: '#2c3e50',
                            cornerColor: '#2c3e50',
                            transparentCorners: false,
                            cornerSize: cornerSize,
                            originX: 'center',
                            originY: 'center',
                            scaleX: 50/svgObject.width,
                            scaleY: 50/svgObject.width
                        });
                    }

                }
                canvas.add(svgObject);
                STATE = null;
                furnitureURL = null;
            });
        }
    });
}

export {iconDrag};