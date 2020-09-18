const {
    rootCertificates
} = require("tls");

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

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
let guest_count = 0;
let userOnlines = []

io.on("connection", socket => {
    socket.user = {
        id: socket.id,
        username: 'guest ' + guest_count,
        connectedTime: Date.now(),
        room: 'lobby'
    }
    userOnlines.push(socket.user);
    guest_count = ++guest_count;

    socket.emit('message', {
        messages: messages
    })
    socket.emit('user_data', {
        user: socket.user
    })
    socket.emit('user_onlines', {
        userOnlines
    })
    socket.on('send_message', msg => {
        messages.push({
            user: socket.user.username,
            msg: msg.msg,
            color: msg.color
        })
        if (messages.length > 10) {
            messages.shift()
        }
        io.emit('message', {
            messages: messages
        })
    })

    //disconnect
    socket.on("disconnect", () => {
        console.log(`${socket.username} has left the party`);
        console.log(userOnlines.length)
        const index = userOnlines.indexOf(socket.user);
        if (index > -1) {
            userOnlines.splice(index, 1);
        }
        io.emit('user_onlines', {
            userOnlines
        })
        console.log(userOnlines.length)
    })
})

http.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port %s", process.env.PORT || 3000);

});