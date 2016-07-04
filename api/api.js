import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';
import * as authentication  from 'actions/authentication';
import * as recipes  from 'actions/recipe';
import handleAction from 'utils/handleAction.js';
import PrettyError from 'pretty-error';
import http from 'http';
import SocketIo from 'socket.io';

const pretty = new PrettyError();
const app = express();
const server = new http.Server(app);
const io = new SocketIo(server);
const mongoose   = require('mongoose');
const Recipe   = require('models/recipe');
const router = express.Router();              // get an instance of the express Router
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
let dbConnected = false, dbError;

io.path('/ws');


app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({  
  extended: true
})); 

mongoose.connect(config.mongoDBURL, (err) => {
  if(err){
    dbError = err;
  }else{
    dbConnected = true;
  }
});

// middleware to use for all requests
router.use(function(req, res, next) {
  if(dbError){
    res.json(dbError);
  }else{
    next();
  }
});

router.get('/status', function(req, res){
  res.json({status:"connected"});
     
});

router.post('/login', function(req, res) {
    handleAction(authentication.login(req), res);
});

router.get('/logout', function(req, res) {
    handleAction(authentication.logout(req), res);
});

router.get('/loadAuth', function(req, res) {
    handleAction(authentication.loadAuth(req.session.user), res);
});

router.get('/loadInfo', function(req, res) {
    handleAction(authentication.loadInfo(), res);
});

router.route('/recipes')

    .post(multipartMiddleware, function(req, res) {
      console.log('post data');
       console.log(req.body, req.files);

       req.body.imageURL=req.files.imageURL.originalFilename;
     
       handleAction(recipes.add(req.body), res);        
    })

    .get(function(req, res) {
        handleAction(recipes.find(), res);
    });

router.route('/recipes/:recipe_id')

    // get the bear with that id (accessed at GET http://localhost:8080/api/bears/:bear_id)
    .get(function(req, res) {
          handleAction(recipes.findBySlug(req.params.recipe_id), res);
    })

    .delete(function(req, res) {
         handleAction(recipes.findByIdAndRemove(req.params.recipe_id), res);
    })

    .put(function(req, res) {
         handleAction(recipes.findByIdAndUpdate(req.params.recipe_id, req.body), res);
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
