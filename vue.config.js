const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // init: function (server) {
    //     var io = require('socket.io')
    //     var listeningIo = io.listen(server, null)
    //     var listeningIoChat = listeningIo.of('/chat')
    //     listeningIoChat.on('connection', function (socket) {
    //         console.log('a user connected to chat')
    //         socket.on('testClicked', function (msg) {
    //             console.log("testClicked")
    //             listeningIoChat.emit('testClicked', msg);
    //         });
    //         socket.on('disconnect', function () {
    //             console.log('user disconnected');
    //         });
    //     });
    // }
})
