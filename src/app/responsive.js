const responsive = ()=>{
    const width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    const height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

    var canvas = document.querySelector("#c");
    canvas.width = width * 0.8 ;
    canvas.height = height * .85 ;
}
export {responsive};