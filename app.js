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
app.use(cors());

// Routes
app.use('/register', require('./backend/routes/register'));
app.use('/login', require('./backend/routes/login'));
app.use('/auth', require('./backend/routes/auth'));
app.use((req, res) => res.status(404).send({ status: "fail", message: "PAGE NOT FOUND"}));

// Sockets
require('./backend/sockets/sockets')(io);

PORT = process.env.API_PORT || 8080
server.listen(PORT, console.log(`Server running at http://localhost:${PORT}...`));