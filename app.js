require('dotenv').config();

const express = require('express')
const cors = require('cors')

const app = express();
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

// Create Database if not exists
require('./backend/models/models.js')();

// Middlewares
app.use(express.static("./public"));
app.use(express.json());

// Cross Origin Resource Sharing
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
  }
app.use(cors(corsOptions));

// Routes
app.use('/register', require('./backend/routes/register'));
app.use('/login', require('./backend/routes/login'));
app.use((req, res) => res.status(404).send({ status: "fail", message: "PAGE NOT FOUND"}));

// Sockets
require('./backend/sockets/sockets')(io);

const PORT = process.env.PORT || 8080;
server.listen(PORT, console.log(`Server running at http://localhost:${PORT}...`));