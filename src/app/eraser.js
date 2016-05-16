export default function (eraserConfig, Event) {
    parseIndicator();
    document.querySelector('#eraserSize').addEventListener('input', (event)=>{
        const fontSize = event.target.value;
        if(!isNaN(parseFloat(fontSize)) && isFinite(fontSize)){
            parseIndicator();
            eraserConfig.eraserSize = parseFloat(fontSize);
            Event.emit('ERASER_CONFIG_CHANGED');
        }

    });
    document.querySelector('#eraserStyle').addEventListener('change', (event)=>{
        eraserConfig.eraserStyle = event.target.value;
        Event.emit('ERASER_CONFIG_CHANGED');
    });
}
export function parseEraserConfig(eraserConfig, canvas){
    let postConfig = {
        style: null,
        size: eraserConfig.eraserSize
    }

    switch(eraserConfig.eraserStyle){
        case 'pencil':
            postConfig.style = new fabric['PencilBrush'](canvas);
            break;
        case 'square':
            console.log('square');
            postConfig.style = new fabric.SquareBrush(canvas);
            break;
        default:
            postConfig.style = new fabric['PencilBrush'](canvas);
            break;
    }
    return postConfig;
}
const parseIndicator = ()=>{
    let indicator = document.querySelector('.range__indicator');
    const indication = parseInt(document.querySelector('#eraserSize').value) + 1;
    indicator.style.left = indication + "%";
    indicator.innerHTML = document.querySelector('#eraserSize').value;
}