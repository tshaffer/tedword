import express from 'express';
// import cors from 'cors';
// import cookieParser from 'cookie-parser';
// import { readConfig } from './config';
// import { spotifyApiConfiguration } from './config';

// import { SpotifyWebApi } from './webApiHelpers';

import { Routes } from './routes/routes';
// import spotifyApiRouter from './routes/spotifyApi';

// export let spotifyWebApi: SpotifyWebApi;

class App {

  public app: express.Application;
  public route: Routes = new Routes();

  constructor() {

    // readConfig('/Users/tedshaffer/Documents/Projects/spotify-2/src/config/config.env');

    // spotifyWebApi = new SpotifyWebApi({
    //   redirectUri: spotifyApiConfiguration.DEFAULT_REDIRECT_URI,
    //   clientId: spotifyApiConfiguration.CLIENT_ID,
    //   clientSecret: spotifyApiConfiguration.CLIENT_SECRET,
    // })

    this.app = express();
    this.config();

    this.app.use(express.static(__dirname + '/public'));
    // .use(cors())
    // .use(cookieParser());

    this.route.routes(this.app);
    // this.app.use('/api/v1', spotifyApiRouter);

    console.log('__dirname');
    console.log(__dirname);
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
