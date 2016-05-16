
const iconList = [
    'bedside-drawer.svg',
    'chair.svg',
    'dinner-table.svg',
    'double-bed.svg',
    'single-bed.svg',
    'sofa.svg',
    'stove.svg'
];

const URL = {
    'furniture': './furniture-sample/'
};

const fetchIcons = (Event)=>{
    let icons = document.querySelector('.icons');

    let iconsHTML = '';
    iconList.forEach((icon)=>{
        iconsHTML += '<div class="icon"><img src="'+ URL.furniture+ icon+ '"></div>';
    });

    icons.innerHTML = iconsHTML;

    let iconImages = document.querySelectorAll('.icon img');

    [].forEach.call(iconImages, (iconImage)=>{
        iconImage.addEventListener('click', (event)=>{
            Event.emit('ICON_CHANGE', event.target.src);
        })
    })

}
const accordion = ()=>{
    let accordions = document.querySelectorAll('.accordion');
    [].forEach.call(accordions, (accordion)=>{
        let className = 'active';
        accordion.addEventListener('click',  (event)=> {
            removeActive();
            if (accordion.classList)
                accordion.classList.add(className);
            else
                accordion.className += ' ' + className;
        });
    });
};
const removeActive = ()=>{
    let accordions = document.querySelectorAll('.accordion');
    [].forEach.call(accordions, (accordion)=>{
        let className = 'active';
        if (accordion.classList)
            accordion.classList.remove(className);
        else
            accordion.className = accordion.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    });
}
export {iconList, URL, fetchIcons, accordion}
