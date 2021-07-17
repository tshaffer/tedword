import express from 'express';
import cors from 'cors';
import connectDB from './config/db';

// import cookieParser from 'cookie-parser';
import { readConfig } from './config';

const bodyParser = require('body-parser');
const Pusher = require('pusher');

import { Routes } from './routes/routes';

import usersRouter from './routes/users';
import { getPuzzleMetadata, getPuzData, getAllPuzzlesMetadata, getUsers, loadPuzzle } from './controllers';

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
    this.app.get('/api/v1/puzData', getPuzData);
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
