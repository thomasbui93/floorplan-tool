const removeTuts = ()=>{
    let tuts = document.querySelectorAll('#mainMenu .tool');
    [].forEach.call(tuts, (tut)=>{
        let className = 'show';
        if (tut.classList)
            tut.classList.remove(className);
        else
            tut.className = tut.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    });
}
const showTuts = (indexTut)=>{
    const tutsArray = [[0,1,2],[3],[4]];
    let tuts = document.querySelectorAll('#mainMenu .tool');
    removeTuts();
    let timeout = 500;
    [].forEach.call(tuts, (tut)=>{
        const tutID = parseInt(tut.getAttribute('data-tut'));
        if(tutsArray[indexTut].indexOf(tutID)>-1){
            setTimeout(()=>{
                let className = 'show';
                if (tut.classList)
                    tut.classList.add(className);
                else
                    tut.className += ' ' + className;
            }, timeout)
            timeout += 500;
        }
    });

}
const resetProgress = ()=>{
    let progressBars= document.querySelectorAll('.progress-bar .progress');
    [].forEach.call(progressBars, (progressBar)=>{
        removeClass(progressBar, 'done');
    })
}
const tut = (tutIndex)=>{
    showTuts(tutIndex);
    resetProgress();
    let progressBars= document.querySelectorAll('.progress-bar .progress');
    [].forEach.call(progressBars, (progressBar)=>{
        const progressBarIndex = parseInt(progressBar.getAttribute('data-progress'));
        if(progressBarIndex <= tutIndex){
            let className = 'done';
            if (progressBar.classList)
                progressBar.classList.add(className);
            else
                progressBar.className += ' ' + className;
        }
    })
}
const findAncestor = (el, cls)=> {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}
const interactiveTut=()=>{
    let tutNodes = document.querySelectorAll('.tool__tuts');
    [].forEach.call(tutNodes, (tutNode)=>{
       tutNode.addEventListener('click', function (event) {
            let tool = findAncestor(node, 'tool');
            removeClass(tool, 'show');
       });
    });
    document.querySelector('.progress-bar__control').addEventListener('click', ()=>{
        removeTuts();
    });
}
const interactiveProgressBar = ()=>{
    let progressBars = document.querySelectorAll('.progress');
    [].forEach.call(progressBars, (progress)=>{
        progress.addEventListener('click', function (event) {
            const tutIndex = parseInt(progress.getAttribute('data-progress'));
            tut(tutIndex);
        });
    });
}
const initTut = ()=>{
    tut(0);
    interactiveTut();
    interactiveProgressBar();
}
const removeClass = (element, className)=>{
    if (element.classList)
        element.classList.remove(className);
    else
        element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}
export {removeTuts, initTut};