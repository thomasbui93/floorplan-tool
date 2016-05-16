import {uploadImage} from './uploadImage';
import request from 'superagent';
let isSVG = true;

const loadingImage = (canvas)=>{
    document.getElementById('localImage').onchange = function handleImage(e) {
        canvas.clear();
        let reader = new FileReader();
        reader.onload = function (event) {

            let imgObj = new Image();
            imgObj.src = event.target.result;

            imgObj.onload = function () {
                // start fabricJS stuff
                const fileType = event.target.result.split(';')[0].substr(11);
                console.log(fileType);
                isSVG = fileType === 'svg+xml';
                let image = new fabric.Image(imgObj);
                const scaleRate = canvas.width/image.width < canvas.height/image.height ? canvas.width/image.width: canvas.height/image.height;
                image.set({
                    top: 0,
                    left: 0,
                    scaleX: scaleRate,
                    scaleY: scaleRate,
                    selectable: true,
                    id: 'imported'
                });
                canvas.add(image);
                canvas.centerObject(image);
                canvas.renderAll();

            }
        }
        reader.readAsDataURL(e.target.files[0]);
        e.target.value = '';
    }
}
const addLogo = (canvas, Event)=>{
    const logoURL = './tools/logo.svg';
    canvas.deactivateAllWithDispatch();
    canvas.renderAll();
    if(isSVG){
        fabric.loadSVGFromURL(logoURL, function(objects, options) {
            var svgObject = fabric.util.groupSVGElements(objects, options);
            const scaleRate = 0.1 * canvas.width/svgObject.width;
            svgObject.set({
                top: canvas.height - svgObject.height * scaleRate - 20 ,
                left: canvas.width - svgObject.width*scaleRate - 20,
                scaleX: scaleRate,
                scaleY: scaleRate,
                selectable: false,
            });
            canvas.add(svgObject);
            Event.emit('DONE_ADDING_TEXT', canvas.toDataURL("png"));
        })
        /*
        let imgObj = new Image();
        imgObj.src = logoURL;
        imgObj.onload = function () {
            // start fabricJS stuff
            let image = new fabric.Image(imgObj);


            if(image.getHeight() !== 0){
                const scaleRate = 0.1 * canvas.width/image.width;
                image.set({
                    top: canvas.height - image.height * scaleRate - 20 ,
                    left: canvas.width - image.width*scaleRate - 20,
                    scaleX: scaleRate,
                    scaleY: scaleRate,
                    selectable: false,
                });
            }else {
                const scaleRate = 50/canvas.height;
                image.set({
                    top: 0 ,
                    left: 0,
                    height: 50,
                    width: 100,
                    scaleX: scaleRate,
                    scaleY: scaleRate,
                    selectable: false
                });
            }

            console.log(image);

            canvas.add(image);
            canvas.renderAll();
            */
            //initDownload(canvas);
            //Event.emit('DONE_ADDING_TEXT', canvas.toDataURL("png"));

    }else {
        Event.emit('DONE_ADDING_TEXT', canvas.toDataURL("png"));
    }
}
const initDownload = (canvas)=>{

}
const downloadImage = (canvas, Event)=>{
    //uploadImage(canvas);
    
    document.getElementById('download').addEventListener('click', function (event) {
        //addLogo(canvas, Event);
        /*Event.on('DONE_ADDING_TEXT', (URL)=>{
            let a = document.createElement('a');
            let linkText = document.createTextNode("Download");
            a.appendChild(linkText);
            a.title = "Download";
            a.href=URL;
            a.download = 'floorplan-'+new Date().toISOString()+'.png';
            a.id='downloadLink';
            a.style.display = 'none';
            document.body.appendChild(a);
            document.getElementById('downloadLink').click();
            removeElement(document.getElementById('downloadLink'));
        })
        */
        removeElement(document.getElementById('downloadLink'));
        const URL = canvas.toDataURL("png");
        let image = document.createElement('img');
        //let linkText = document.createTextNode("Download");
        //a.appendChild(linkText);
        //a.title = "Download";
        image.src=URL;
        //a.download = 'floorplan-'+new Date().toISOString()+'.png';
        image.id='downloadLink';
        image.style.display = 'none';
        document.body.appendChild(image);
        document.getElementById('downloadLink').click();
    });
}
const asyncFloorplan = (Event, canvas)=>{
    const id = getUrlVars()['id'];
    const baseURL = 'https://geo.cubi.casa/v1/search/id?ids=';
    const URL = baseURL + id;
    if(id !== undefined){
        request.get(URL).end((error, response)=>{
            if(error === null){
                let res = JSON.parse(response.text);
                let svgURL = res.features[0].properties.models[0].svg;
                console.log(svgURL);
                //request.get(svgURL)
                Event.emit('RECEIVED_URL', svgURL);
            }
        });
    }
    Event.on('RECEIVED_URL', (svgURL)=>{
        let imgObj = new Image();
        imgObj.src = svgURL;
        imgObj.setAttribute('crossOrigin', 'Anonymous');
        imgObj.onload = function () {
            // start fabricJS stuff
            let image = new fabric.Image(imgObj);
            const scaleRate = canvas.width/image.width < canvas.height/image.height ? canvas.width/image.width: canvas.height/image.height;
            image.set({
                top: 0,
                left: 0,
                scaleX: scaleRate,
                scaleY: scaleRate,
                selectable: true,
                id: 'imported'
            });
            canvas.add(image);
            canvas.centerObject(image);
            canvas.renderAll();
        }
    })
}
const getUrlVars = ()=>{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
const  removeElement = (element)=> {
    element && element.parentNode && element.parentNode.removeChild(element);
}
export {loadingImage, downloadImage, asyncFloorplan};