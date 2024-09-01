const express = require('express');
const app = express();
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

// Correct way to serve static files
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

io.on("connection", function(socket) {
    socket.on("send-location",function(data){
        io.emit("receive-location", {id:socket.id, ...data});
    });
    socket.on("disconnected",function(){
        io.emit("user-disconnected",socket.id);
    });
});

app.get("/", function(req, res) {
    res.render("index");
});

server.listen(3000, function() {
    console.log("Server running on port 3000");
});
