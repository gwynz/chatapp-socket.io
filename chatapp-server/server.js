const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let users = [];
let messages = [{
        user: 'User 1',
        msg: 'Hello',
        color: '#000000'
    },
    {
        user: 'User 2',
        msg: 'hii',
        color: '#000000'
    },
    {
        user: 'User 3',
        msg: 'haha',
        color: '#000000'
    }
];
let index = 0;

io.on("connection", socket => {
    socket.emit('message', {
        messages: messages
    })
    socket.on('send_message', msg => {
        messages.push({
            user: msg.user,
            msg: msg.msg,
            color: msg.color
        })
        socket.emit('message', {
            messages: messages
        })
    })
    socket.on('newuser', username => {
        console.log(`${username} has arrived at the party`);
        socket.username = username;
        users.push(socket);

    })
    //disconnect
    socket.on("disconnect", () => {
        console.log(`${socket.username} has left the party`);
    })
})

http.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port %s", process.env.PORT || 3000);
});