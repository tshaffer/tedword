import express from 'express';
import { 
  getIndex,
  getCSS,
  getBundle,
  getBundleMap,
  getJoinGameIndex,
  cellChange,
 } from '../controllers';

export class Routes {

  public routes(app: express.Application): void {
    this.createRoutes(app);
  }

  createRoutes(app: express.Application) {
    app.get('/', getIndex);
    app.get('/index.html', getIndex);
    app.get('/joinGameIndex.html', getJoinGameIndex);
    app.get('/css/app.css', getCSS);
    app.get('/build/bundle.js', getBundle);
    app.get('/build/bundle.js.map', getBundleMap);
    app.post('/api/v1/cellChange', cellChange);
  }
}
