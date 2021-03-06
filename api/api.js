import express from 'express';
import bodyParser from 'body-parser';
import config from '../src/config';
import APIConfig from './config';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';
import stormpath from './middleware/stormpath';
import router from "./router";
import httpProxy from 'http-proxy';
const pretty = new PrettyError();
const app = express();
const server = new http.Server(app);
const io = new SocketIo(server);
const mongoose = require('mongoose');


let dbConnected = false, dbError;
mongoose.connect(config.mongoDBURL, (err) => {
  if(err){
    dbError = err;
  }else{
    dbConnected = true;
  }
});

io.path('/ws');

stormpath(app);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// middleware to use for all requests
app.use('/', function(req, res, next) {
  if(dbError){
    res.status(500);
    res.json(dbError);
  }else{
    next();
  }
});

app.use('/', router);

const bufferSize = 100;
const messageBuffer = new Array(bufferSize);
let messageIndex = 0;

if (config.apiPort) {
  const runnable = app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);

  });

  io.on('connection', (socket) => {
    socket.emit('news', {msg: `'Hello World!' from server`});

    socket.on('history', () => {
      for (let index = 0; index < bufferSize; index++) {
        const msgNo = (messageIndex + index) % bufferSize;
        const msg = messageBuffer[msgNo];
        if (msg) {
          socket.emit('msg', msg);
        }
      }
    });

    socket.on('msg', (data) => {
      data.id = messageIndex;
      messageBuffer[messageIndex % bufferSize] = data;
      messageIndex++;
      io.emit('msg', data);
    });
  });
  io.listen(runnable);
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
