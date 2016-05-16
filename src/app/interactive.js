import { iconList, URL } from './settings';

export default function (Event) {
    let tools = document.querySelectorAll('.tool');
    [].forEach.call(tools, function(tool) {
        let className = 'active';
        tool.addEventListener('click',  (event)=> {
            let role = tool.getAttribute('data-role').toUpperCase();
            Event.emit('TOOL_CHANGE', role);
            Array.prototype.filter.call(tool.parentNode.children, function(child){
                if( child !== tool){
                    if (child.classList)
                        child.classList.remove(className);
                    else
                        child.className = child.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                }
            });

            if (tool.classList) {
                tool.classList.toggle(className);
            } else {
                let classes = tool.className.split(' ');
                let existingIndex = classes.indexOf(className);

                if (existingIndex >= 0)
                    classes.splice(existingIndex, 1);
                else
                    classes.push(className);

                tool.className = classes.join(' ');
            }

        });
    });
    document.querySelector('.gallery .close').addEventListener('click', function (event) {
        document.querySelector('.gallery').style.transform = 'translateX(200px)';
    });

    let templates = document.querySelectorAll('#templates .tool');
    [].forEach.call(templates, (template)=>{
        template.addEventListener('click', (event)=>{
            let role = template.getAttribute('data-hint').toUpperCase();
            Event.emit('CHANGE_TEMPLATE', role);
        })
    });

    document.querySelector('.tool').addEventListener('click', function (event) {
        let templateContainer = document.querySelector('.templates');
        const className = 'show';

        if (templateContainer.classList) {
            templateContainer.classList.toggle(className);
        } else {
            let classes = templateContainer.className.split(' ');
            let existingIndex = classes.indexOf(className);

            if (existingIndex >= 0)
                classes.splice(existingIndex, 1);
            else
                classes.push(className);

            templateContainer.className = classes.join(' ');
        }
    });


}
