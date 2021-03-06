import { Request, Response } from 'express';
import * as path from 'path';

import { pusher } from '../app';
import { updateCellContents } from './dbInterface';

export function getIndex(request: Request, response: Response) {
  console.log('getIndex invoked');
  const pathToIndex = path.join(__dirname, '../../public', 'index.html');
  console.log('pathToIndex');
  console.log(pathToIndex);
  response.sendFile(pathToIndex);
}

export function getCSS(request: Request, response: Response) {
  const pathToCSS = path.join(__dirname, '../../public', 'css', 'app.css');
  response.sendFile(pathToCSS);
}

export function getCloseIcon(request: Request, response: Response) {
  console.log('invoke getCloseIcon');
  const pathToCloseIcon = path.join(__dirname, '../../public', 'icons', 'close.svg');
  response.sendFile(pathToCloseIcon);
}

export function getBundle(request: Request, response: Response) {
  console.log('getBundle invoked');
  const pathToBundle = path.join(__dirname, '../../public', 'build', 'bundle.js');
  console.log('pathToBundle');
  console.log(pathToBundle);
  response.sendFile(pathToBundle);
}

export function getBundleMap(request: Request, response: Response) {
  console.log('getBundleMap invoked');
  const pathToBundleMap = path.join(__dirname, '../../public', 'build', 'bundle.js.map');
  console.log(pathToBundleMap)
  response.sendFile(pathToBundleMap);
}

export function cellChange(request: Request, response: Response) {
  console.log('cellChange invoked');
  console.log(request.body);
  const { boardId, user, row, col, typedChar } = request.body;
  updateCellContents(boardId, user, row, col, typedChar);
  pusher.trigger(boardId, 'cell-change', {
    user,
    row,
    col,
    typedChar,
  });
  response.sendStatus(200);
}
