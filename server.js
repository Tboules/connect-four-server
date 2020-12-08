require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");
const gameRoutes = require("./gameRoutes");

const app = express();
app.use(cors());
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("db working");
});

app.use(express.json());
app.use("/api", routes);
app.use("/gameApi", gameRoutes);

io.on("connection", (socket) => {
  const { roomId } = socket.handshake.query;
  socket.join(roomId);
  socket.on("joinEvent", (data) => {
    io.in(roomId).emit("joinEvent", data);
  });

  socket.on("chatEvent", (data) => {
    io.in(roomId).emit("chatEvent", data);
  });
  socket.on("boardEvent", (data) => {
    io.in(roomId).emit("boardEvent", data);
  });
});

//serve static assets if in prod
// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static('../connect-four/build'))
// }

server.listen(process.env.PORT, () =>
  console.log(`I'm listening on port ${process.env.PORT} `)
);
