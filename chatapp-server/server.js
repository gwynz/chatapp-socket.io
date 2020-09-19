const {
    rootCertificates
} = require("tls");

const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);

let messages = {
    1: [],
    2: []
};
let guest_count = 0;
let userOnlines = []
let rooms = [{
    _id: 'qwe78213uiyoiuqw891238a9sd',
    id: 1,
    name: 'Lobby',
    online: 0
}, {
    _id: 'oihuj210378u0as9du0as9e8d2',
    id: 2,
    name: 'Private',
    online: 0
}]
io.on("connection", socket => {
    rooms[0].online++;
    socket.user = {
        id: socket.id,
        username: 'guest ' + guest_count,
        connectedTime: Date.now(),
        room_id: rooms[0].id
    }

    let selectedRoom = rooms.find(x => x.id === socket.user.room_id);
    socket.join(socket.user.room_id);
    messages[socket.user.room_id].push({
        user: 'System',
        msg: socket.user.username + ' has connect room',
        color: 'pink'
    })
    socket.to(socket.user.room_id).emit('message', {
        messages: messages[socket.user.room_id]
    })
    userOnlines.push(socket.user);
    guest_count = ++guest_count;

    socket.emit('message', {
        messages: messages[socket.user.room_id].slice(-8)
    })
    socket.emit('user_data', {
        user: socket.user
    })
    io.emit('user_onlines', {
        userOnlines
    })
    socket.on('send_message', msg => {
        messages[socket.user.room_id].push({
            user: socket.user.username,
            msg: msg.msg,
            color: msg.color
        })
        io.to(socket.user.room_id).emit('message', {
            messages: messages[socket.user.room_id].slice(-8)
        })
    })
    io.emit('get_rooms', {
        rooms
    })
    socket.emit('get_selected_room', {
        selectedRoom
    })
    socket.on('join_room', data => {
        var leave_index = rooms.findIndex(x => x.id === selectedRoom.id);
        rooms[leave_index].online--;
        selectedRoom = data
        var join_index = rooms.findIndex(x => x.id === selectedRoom.id);
        rooms[join_index].online++;
        io.emit('get_rooms', {
            rooms
        })
        socket.emit('get_selected_room', {
            selectedRoom
        })

        //leave
        messages[rooms[leave_index].id].push({
            user: 'System',
            msg: socket.user.username + ' has leave room',
            color: 'pink'
        })
        socket.to(rooms[leave_index].id).emit('message', {
            messages: messages[socket.user.room_id].slice(-8)
        })
        socket.leave(rooms[leave_index].id);
        // join
        socket.join(rooms[join_index].id);
        socket.user.room_id = rooms[join_index].id
        messages[rooms[join_index].id].push({
            user: 'System',
            msg: socket.user.username + ' has join room',
            color: 'pink'
        })
        io.in(rooms[join_index].id).emit('message', {
            messages: messages[socket.user.room_id]
        })
    })
    //disconnect
    socket.on("disconnect", () => {
        console.log(`${socket.username} has left the party`);
        let index = userOnlines.indexOf(socket.user);
        if (index > -1) {
            userOnlines.splice(index, 1);
        }
        console.log(userOnlines)
        io.emit('user_onlines', {
            userOnlines
        })

        var leave_index = rooms.findIndex(x => x.id === selectedRoom.id);
        rooms[leave_index].online--;
        io.emit('get_rooms', {
            rooms
        })
        //leave
        messages[rooms[leave_index].id].push({
            user: 'System',
            msg: socket.user.username + ' has disconnect room',
            color: 'pink'
        })
        socket.to(rooms[leave_index].id).emit('message', {
            messages: messages[socket.user.room_id].slice(-8)
        })
        socket.leave(rooms[leave_index].id);
    })
})

http.listen(process.env.PORT || 3000, () => {
    console.log("Listening on port %s", process.env.PORT || 3000);

});