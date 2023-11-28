import express from 'express';
import { createServer, Server } from 'http';
import { Server as IO } from 'socket.io';

class App {
    public app: express.Application;
    public server: Server;
    private socketIo: IO;

    constructor () {
        this.app = express();
        this.server = createServer(this.app);
        this.socketIo = new IO(this.server, {
            cors: {
                origin: "*"
            }
        });

        this.socketIo.on('connection', socket => {
            console.log('teste');

            socket.on('message', (message) => {
                this.socketIo.emit('message', message);
            })
        })

    }
}

export default App;