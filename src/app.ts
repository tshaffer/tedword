import express from 'express';
import cors from 'cors';
import connectDB from './config/db';

var multer = require('multer');
var upload = multer();

// import cookieParser from 'cookie-parser';
import { readConfig } from './config';

const bodyParser = require('body-parser');
const Pusher = require('pusher');

import { Routes } from './routes/routes';

import usersRouter from './routes/users';
import {
  createBoard,
  getPuzzleMetadata,
  getAllPuzzlesMetadata,
  getUsers,
  loadPuzzle,
  getPuzzle,
  getBoards,
  // uploadPuzzle
} from './controllers';

export let pusher: any;

class App {

  public app: express.Application;
  public route: Routes = new Routes();

  constructor() {

    readConfig('/Users/tedshaffer/Documents/Projects/tedword/src/config/config.env');

    connectDB();

    pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_APP_KEY,
      secret: process.env.PUSHER_APP_SECRET,
      cluster: process.env.PUSHER_APP_CLUSTER,
      encrypted: true,
    });

    this.app = express();
    this.config();

    this.app.use(express.static(__dirname + '/public'));
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    this.route.routes(this.app);

    // user routes
    this.app.use('/api/v1', usersRouter);
    this.app.get('/api/v1/users', getUsers);

    // puzzle routes
    this.app.get('/api/v1/loadPuzzle', loadPuzzle);
    this.app.get('/api/v1/allPuzzlesMetadata', getAllPuzzlesMetadata);
    this.app.get('/api/v1/puzzleMetadata', getPuzzleMetadata);
    this.app.get('/api/v1/puzzle', getPuzzle);
    // this.app.post('/api/v1/uploadPuzzle', uploadPuzzle);

    // board routes
    this.app.get('/api/v1/boards', getBoards);
    this.app.post('/api/v1/board', createBoard)

    // this.app.post('/api/v1/uploadPuzzle', upload.single('puzzle'), function (req, res, next) {
    //   console.log('uploadPuzzle handler');
    //   console.log(req);
    //   console.log((req as any).file);
    //   // req.file is the `puzzle` file
    //   // req.body will hold the text fields, if there were any
    // })

    const uploadPuzzle = multer();
    this.app.post('/api/v1/uploadPuzzle', uploadPuzzle.any(), (req: any, res: any) => this.handleUploadPuzzle(req, res));


  }

  handleUploadPuzzle(req: any, res: any) {
    console.log('handleUploadPuzzle');

    console.log('req');
    console.log(req);
    
    console.log('req.files');
    console.log(req.files);
    console.log('buffer');
    const buffer: any = req.files[0].buffer;
    console.log(buffer);

    /*
  const fileSpecs: FileToPublish[] = JSON.parse(buffer).file;

  const response: any = getFilesToPublishResponse(fileSpecs);
  res.json(response);
    */
  }

  private config(): void {
    let port: any = process.env.PORT;
    if (port === undefined || port === null || port === '') {
      port = 8888;
    }
    this.app.set('port', port);
  }
}

export default new App().app;
