import express from 'express';
const puzzlesRouter = express.Router();

import {
  loadPuzzle,
} from '../controllers/testEndpoints';

// test endpoints
puzzlesRouter.get('/loadPuzzle/:puzzlePath', loadPuzzle);

export default puzzlesRouter;
