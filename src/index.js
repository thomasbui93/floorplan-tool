import EventEmitter from 'eev';
import style from './sass/style.scss';
import { drawLine, drawRoom } from './app/tools';
import { fetchIcons, accordion } from './app/settings';
import interactive from './app/interactive';
import EVENT from './app/events';
import { studio, oneBR, twoBR, threeBR, fourBR } from './app/template.room';
import {loadingImage, downloadImage, asyncFloorplan} from './app/importImage';
import {iconDrag} from './app/iconDrag';
import {undo, redo, initIntro, moveVector, checkSelected } from './app/utils';
import {responsive} from './app/responsive';
import {removeTuts, initTut} from './app/tuts';
import {initDialog, showDialog} from './app/dialog';
import labelControl from './app/label';
import eraserControl, {parseEraserConfig} from './app/eraser';
responsive();

const canvas = new fabric.Canvas('c', { selection: false, backgroundColor : "#ffffff" });

canvas.setBackgroundImage('http://orig15.deviantart.net/475d/f/2011/094/d/a/drawing_grid_by_blossomhillstables-d3d70y5.png',
    canvas.renderAll.bind(canvas), {
    backgroundImageOpacity: 0.5,
    backgroundImageStretch: false
});

// variables declaration
let line, room, isDown;

let rectCoord = { x: null , y: null };
let furnitureURL = null;
let labelTag = null;
let STATE = null;
let Event = new EventEmitter();
let SELECTED = false;
let REDO = false;
let undoList = [];
let importedImagePath = [];
let selectedLabel = null;
let labelConfig = {
  fontSize: 15,
  fontStyle: 'normal',
  fontWeight: 'normal'
}
let eraserConfig = {
    eraserSize: 15,
    eraserStyle: 'pencil'
}

// end variables
initDialog(canvas);
interactive(Event);
//fetchIcons(Event);
loadingImage(canvas);
iconDrag(canvas,Event, STATE, furnitureURL, labelTag, labelConfig);
accordion();
downloadImage(canvas, Event);
asyncFloorplan(Event, canvas);
initIntro();
labelControl(labelConfig, Event);
eraserControl(eraserConfig, Event);

canvas.on('mouse:down', function(o){
    isDown = true;
    switch(STATE){
        case EVENT.LINE:
            line = drawLine(canvas, o);
            canvas.add(line);
            break;
        case EVENT.ROOM:
            rectCoord.x = o.e.offsetX;
            rectCoord.y = o.e.offsetY;

            room = drawRoom(canvas, o);
            canvas.add(room);
            break;
        case EVENT.LABEL:
            furnitureURL = null;
            console.log(selectedLabel !== null);
            if(selectedLabel === null){
                canvas.add(new fabric.IText('TAP_HERE', {
                    fontFamily: "'Roboto', sans-serif",
                    left: o.e.offsetX,
                    top: o.e.offsetY,
                    fontSize: labelConfig.fontSize,
                    fontWeight: labelConfig.fontWeight,
                    fontStyle: labelConfig.fontStyle,
                    hasBorders: true,
                    hasControls: false,
                    borderColor: '#2c3e50',
                    cornerColor: '#2c3e50',
                    cornerSize: 3,
                    transparentCorners: false
                }));
            }
            break;
        case EVENT.FURNITURE:
            labelTag = null;
            break;
    }
});

canvas.on('object:selected', (event)=>{
    const type = event.target.get('type');
    if(type === 'i-text'){
        selectedLabel = event.target;
    }else {
        selectedLabel = null;
        STATE = null;
    }
});
canvas.on('selection:cleared', ()=>{
    selectedLabel = null;
})
document.querySelector('.canvas-container').addEventListener('touchstart', function (event) {
    let rect = this.getBoundingClientRect();
    const o = {
        x: event.touches[0].clientX - rect.left,
        y: event.touches[0].clientY - rect.top
    };

    isDown = true;
    switch(STATE){
        case EVENT.LINE:
            line = drawLine(canvas, o);
            canvas.add(line);
            break;
        case EVENT.ROOM:
            rectCoord.x = o.x;
            rectCoord.y = o.y;

            room = drawRoom(canvas, o);
            canvas.add(room);
            break;
        case EVENT.LABEL:
            canvas.add(new fabric.IText('TAP_HERE', {
                fontFamily: "'Roboto', sans-serif",
                left: 500,
                top: 500,
                fontSize: labelConfig.fontSize,
                fontWeight: labelConfig.fontWeight,
                fontStyle: labelConfig.fontStyle,
                hasBorders: true,
                hasControls: false,
                borderColor: '#2c3e50',
                cornerColor: '#2c3e50',
                cornerSize: 3,
                transparentCorners: false
            }));
            let lastIndex = canvas._objects.length;
            canvas.setActiveObject(canvas.item(lastIndex-1));
            break;
        case EVENT.FURNITURE:
            break;
        case EVENT.DRAG_FURNITURE:
            break;
        case EVENT.DODDLE:
            let circle = new fabric.Circle({
                radius: 2,
                left: o.x,
                top: o.y,
                fill: '',
                stroke: 'black',
                strokeWidth: 3,
                originX: 'center',
                originY: 'center'
            });
            canvas.add(circle)
            break;

    }

});
canvas.on('touch:drag', (o)=>{
    if (!isDown) return;
    let pointer = o.self;
    switch (STATE){
        case EVENT.LINE:
            line.set({ x2: pointer.x, y2: pointer.y });
            break;
        case EVENT.ROOM:
            if(rectCoord.x > pointer.x){
                room.set({ left: Math.abs(pointer.x) });
            }
            if(rectCoord.y >pointer.y ){
                room.set({ top: Math.abs(pointer.y) });
            }
            room.set({ width: Math.abs(rectCoord.x - pointer.x) });
            room.set({ height: Math.abs(rectCoord.y - pointer.y) });
            break;
        case EVENT.DODDLE:
            break;
    }

    canvas.renderAll();
});

canvas.on('mouse:move', function(o){
    if (!isDown) return;
    let pointer = canvas.getPointer(o.e);

    switch (STATE){
        case EVENT.LINE:
            line.set({ x2: pointer.x, y2: pointer.y });
            break;
        case EVENT.ROOM:
            if(rectCoord.x > pointer.x){
                room.set({ left: Math.abs(pointer.x) });
            }
            if(rectCoord.y >pointer.y ){
                room.set({ top: Math.abs(pointer.y) });
            }

            room.set({ width: Math.abs(rectCoord.x - pointer.x) });
            room.set({ height: Math.abs(rectCoord.y - pointer.y) });
            break;

    }

    canvas.renderAll();
});

canvas.on('mouse:up', function(o){
    isDown = false;
});

canvas.on('path:created', (object)=>{
    if(canvas.isDrawingMode){
       // console.log(object);
        let lastIndex = canvas._objects.length;

        canvas.item(lastIndex-1).selectable = false;
        canvas.renderAll();
    }
});
canvas.on('object:moving', (object)=>{
    if(object.target.id ==='imported' ){
        const floorplan = object.target;
        const pathXY = { top: floorplan.get('top'), left: floorplan.get('left')};
        //console.log(pathXY);
        importedImagePath.push(pathXY);
        if(importedImagePath,length === 2){
            const vector = [importedImagePath[importedImagePath.length-1].top- importedImagePath[importedImagePath.length-2].top,
                importedImagePath[importedImagePath.length-1].left - importedImagePath[importedImagePath.length-2].left];
            moveVector(canvas, vector);
        }
        if(importedImagePath.length > 2){
            importedImagePath.shift();
            const vector = [importedImagePath[importedImagePath.length-1].top- importedImagePath[importedImagePath.length-2].top,
                importedImagePath[importedImagePath.length-1].left - importedImagePath[importedImagePath.length-2].left];
            moveVector(canvas, vector);
        }
    }
});
Event.on('TOOL_CHANGE', (role)=> {
    console.log(role, STATE);
    if(STATE === role){
        STATE = null;
    }else{
        STATE = role;
    }
    
    if(STATE === EVENT.FURNITURE){
        document.querySelector('.gallery').style.transform = 'translateX(0px)';
    }else {
        document.querySelector('.gallery').style.transform = 'translateX(200px)';
    }

    if(STATE === EVENT.CLEAR){
        showDialog();
    }
    if(STATE === EVENT.ERASER){
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = parseEraserConfig(eraserConfig, canvas).style;
        canvas.freeDrawingBrush.color = 'white';
        canvas.freeDrawingBrush.width = parseEraserConfig(eraserConfig, canvas).size;
    }else {
        if(STATE === EVENT.DODDLE){
            canvas.freeDrawingBrush = new fabric['PencilBrush'](canvas);
            canvas.freeDrawingBrush.color = 'black';
            canvas.freeDrawingBrush.width = 3;
            canvas.isDrawingMode = true;
        }else {
            canvas.isDrawingMode = false;
        }

    }
    if(role === EVENT.UNDO){
        undo(canvas, undoList);
    }
    if(role === EVENT.REDO){
        redo(canvas, undoList, REDO)
    }
    if(STATE === EVENT.DRAWING){
        document.getElementById('templates').style.left = '0px';
        document.getElementById('drawing').style.left = '70px';
    }

    if(role === EVENT.TEMPLATES){
        document.getElementById('drawing').style.left = '0px';
        document.getElementById('templates').style.left = '70px';
    }

    if(role === EVENT.LABEL){
        document.querySelector('.label-controller').style.transform = 'translateX(0px)';
    }else {
        document.querySelector('.label-controller').style.transform = 'translateX(200px)';
    }
    if(role === EVENT.ERASER){
        document.querySelector('.eraser-controller').style.transform = 'translateX(0px)';
    }else {
        document.querySelector('.eraser-controller').style.transform = 'translateX(200px)';
    }
    if(STATE === null){
        canvas.getObjects().map(function(object) {
            if(object.id ==='imported' ){
                object.set({
                    selectable: true
                })
            }
        });

        document.getElementById('templates').style.left = '0px';
        document.getElementById('drawing').style.left = '0px';
        document.querySelector('.label-controller').style.transform = 'translateX(200px)';
        document.querySelector('.eraser-controller').style.transform = 'translateX(200px)';
    }else {
        canvas.getObjects().map(function(object) {
            if(object.id ==='imported' ){
                object.set({
                    selectable: false
                })
            }
        });
    }
});

Event.on('ICON_CHANGE', (iconURL)=>{
    STATE = EVENT.FURNITURE;
    furnitureURL = iconURL;
})
Event.on('ICON_DRAG_START', (iconURL)=>{
    furnitureURL = iconURL;
});

Event.on(EVENT.CHANGE_TEMPLATE, (template)=>{
    canvas.clear();
    switch (template){
        case 'STUDIO':
            studio(canvas);
            break;
        case 'ONE BEDROOM':
            oneBR(canvas);
            break;
        case 'TWO BEDROOM':
            twoBR(canvas);
            break;
        case 'THREE BEDROOM':
            threeBR(canvas);
            break;
        case 'FOUR BEDROOM':
            //fourBR(canvas);
            break;
    }
});
Event.on('LABEL_CONFIG_CHANGED', ()=>{
    if(selectedLabel.selected){
        selectedLabel.set({
            fontSize: labelConfig.fontSize,
            fontWeight: labelConfig.fontWeight,
            fontStyle: labelConfig.fontStyle,
        })
        canvas.renderAll();
    }
});
Event.on('ERASER_CONFIG_CHANGED', ()=>{
    canvas.isDrawingMode = true;
    canvas.freeDrawingBrush = parseEraserConfig(eraserConfig, canvas).style;
    canvas.freeDrawingBrush.color = 'white';
    canvas.freeDrawingBrush.width = parseEraserConfig(eraserConfig, canvas).size;
   //console.log(parseEraserConfig(eraserConfig, canvas));
    canvas.renderAll();
    //console.log(canvas.freeDrawingBrush);
})
canvas.on('object:selected', (event)=>{
    const className = event.target.get('type');
    if (className === 'i-text') {
        SELECTED = true;

    }
})
canvas.on('selection:cleared', (event)=>{
    SELECTED = false;
})


canvas.on('object:added',function(){
    if(!REDO){
        undoList = [];
    }
    REDO = true;
});

document.body.addEventListener('keydown', function(event) {
    if(event.keyCode === 46 && canvas.getActiveObject() !==null){
        canvas.getActiveObject().remove();
    }
});

