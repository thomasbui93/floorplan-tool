export default function (labelConfig, Event) {
    document.querySelector('#fontSize').addEventListener('change', (event)=>{
        const fontSize = event.target.value;
        if(!isNaN(parseFloat(fontSize)) && isFinite(fontSize)){
            labelConfig.fontSize = parseFloat(fontSize);
            Event.emit('LABEL_CONFIG_CHANGED');
        }
    });
    document.querySelector('#fontStyle').addEventListener('change', (event)=>{
        labelConfig.fontStyle = event.target.value;
        Event.emit('LABEL_CONFIG_CHANGED');
    });
    document.querySelector('#fontWeight').addEventListener('change', (event)=>{
        labelConfig.fontWeight = event.target.value;
        Event.emit('LABEL_CONFIG_CHANGED');
    });
    document.querySelector('.canvas-container').addEventListener('keyup',(event)=>{

    });
    /*
     let labels = document.querySelectorAll('.label');
     [].forEach.call(labels, (label)=>{
     label.addEventListener('dragstart', (event)=>{
     labelTag = label.innerHTML.trim();
     return false;
     }, false)
     })
     */

}
