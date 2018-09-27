const socketIo=require('socket.io');
const initTwitter=require('./twitter-stream');

let stream;

module.exports= function(server) {
    const io=socketIo(server);
    io.on('connection', (socket) => {
        socket.on('hashtag', (hashtag) => {
            if (stream){
                stream.destroy();
            }
            stream=initTwitter(hashtag)
        });
        io.on('disconnect', (hashtag) => {
            if(strem){
                stream.destroy();
            } 
        });
    });
    
}