require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes");
const gameRoutes = require("./gameRoutes");

const PORT = 3001;

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

  socket.on("chatEvent", (data) => {
    io.in(roomId).emit("chatEvent", data);
  });
});

server.listen(PORT, () => console.log(`I'm listening on port ${PORT} `));
