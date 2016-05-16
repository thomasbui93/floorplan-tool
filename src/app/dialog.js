const initDialog = (canvas)=>{
    document.querySelector('#dialog-yes').addEventListener('click', function (event) {
        canvas.clear();
        let className = 'show';
        if (document.querySelector('.dialog').classList)
            document.querySelector('.dialog').classList.remove(className);
        else
            document.querySelector('.dialog').className = document.querySelector('.dialog').className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');

    });
    document.querySelector('#dialog-cancel').addEventListener('click', function (event) {
        let className = 'show';
        if (document.querySelector('.dialog').classList)
            document.querySelector('.dialog').classList.remove(className);
        else
            document.querySelector('.dialog').className = document.querySelector('.dialog').className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    });
}
const showDialog = ()=>{
    let className = 'show';
    if (document.querySelector('.dialog').classList)
        document.querySelector('.dialog').classList.add(className);
    else
        document.querySelector('.dialog').className += ' ' + className;
}
export { initDialog, showDialog};