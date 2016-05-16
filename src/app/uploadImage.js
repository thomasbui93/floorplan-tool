import superagent from 'superagent';
const uploadImage = (canvas)=>{
    superagent.post('https://www.cubi.casa/airbnb/order/server/')
        .send(canvas.toDataURL("png"))
        .end(function(err, response) {
            console.log(err);
            if(!err){
                window.location('https://www.cubi.casa/airbnb/order/');
            }
        });
}
export {uploadImage};
