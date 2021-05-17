const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");
const { addUser, removeUser, getUser } = require("./users/users.js");

const PORT = process.env.PORT || 5000;

const router = require("./routes/router");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["name"],
    credentials: true,
  },
});

const errorHandler = (error) => {
  throw new Error(error);
};

io.on("connection", (socket) => {
  socket.on("login", ({ name }, callback) => {
    if (name == undefined) {
      return errorHandler((error = "Invalid Name"));
    }
    const { error, user } = addUser({ id: socket.id, name });

    if (error) return callback(error);

    socket.join("chat-room");

    socket.emit("message", { user: "admin", text: `Welcome to the room` });

    socket.broadcast
      .to("chat-room")
      .emit("message", { text: `${user.name}, has jointed!` });
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    if (user == undefined) {
      return errorHandler((error = "No User Found"));
      removeUser(socket.id);
    }

    io.to("chat-room").emit("message", { user: user.name, text: message });
    callback({
      status: 202,
    });
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to("chat-room").emit("message", {
        user: "admin",
        text: `${user.name} has left !`,
      });
    }
  });
});

app.use(cors());
app.use(router);

app.use((error, req, res, next) => {
  if (error instanceof Error) {
    res.send({
      errorType: "Internal server Error",
      errorMessage: error.message,
      errorCode: 500,
    });
  }
});

server.listen(PORT, () => console.log(`Server has stated at port ${PORT}`));